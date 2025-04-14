import { GeneratePodcastProps } from '@/types'
import { useToast } from "@/hooks/use-toast"
import React, { useState } from 'react'
import { Loader, Loader2 } from 'lucide-react'
import { log } from 'console'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {v4 as uuidv4} from 'uuid'
import { generateUploadUrl } from '@/convex/files'
import {useUploadFiles} from '@xixixao/uploadstuff/react'
import { voiceDetails } from '@/constants'

import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Label } from '@radix-ui/react-label'

const useGeneratePodcast = (props:GeneratePodcastProps)=>{
   
    const [isGenerating, setisGenerating] = useState(false)
    const { toast } = useToast()

    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const {startUpload}= useUploadFiles(generateUploadUrl)
    
    const getPodcastAudio = useAction(api.openai.generateAudioAction)
    const getAudioUrl = useMutation(api.podcasts.getUrl)


    const generatePodcast = async ()=>{
        setisGenerating(true)
        props.setAudio('')

        if (!props.voicePrompt) {
            toast({
                title: "Please provide a Voice Type to generate Podcast",
              })
            return setisGenerating(false)
        }
        
        try {
//getting voice name and giving voice Id
            const voice_name= props.voiceType

            const voice_id = voiceDetails.find((obj)=>{ return obj.name.toLowerCase() === voice_name.toLowerCase();})

           const responce = await getPodcastAudio({
            voice:voice_id?.id || '29vD33N1CtxCmqQRPOHJ',
            input:props.voicePrompt
           }) 
           
           const blob = new Blob([responce],{type:'audio/mpeg'})

            if (blob.size === 0) {
            toast({ title: "Audio generation failed. Empty file returned.", variant: "destructive" });
            setisGenerating(false);
            return;
            }


           const fileName = `podcast${uuidv4()}.mp3`
           const file = new File([blob], fileName,{type:'audio/mpeg'})


           const uploaded= await startUpload([file])
           const storageId= (uploaded[0].response as any).storageId

           props.setAudioStorageId(storageId)

           const audiourl = await getAudioUrl({storageId})
           props.setAudio(audiourl!)
           setisGenerating(false)
           toast({
            title: "Podcast Generated Successfully",
          })
         
        } catch (error) {
            toast({
                title: "Error occured while Generating Podcast",
                variant:'destructive'
              })
            console.log("Error occured while Generating Podcast",error);
            return setisGenerating(false)
            
        }


    }

    return {
        isGenerating,
        generatePodcast
    }
}

function GeneratePodcast(props:GeneratePodcastProps) {
      const {isGenerating,generatePodcast}=useGeneratePodcast(props)
    
  return (
    <div  >
        <div className='flex flex-col gap-2.5'>
            <Label className='text-16 font-bold text-white-1'>
                AI Prompt to Generate Podcast
            </Label>
            <Textarea
                className='input-class font-light focus-visible:ring-offset-orange-1'
                placeholder='Provide Text ot Generate Audio'
                rows={5}
                value={props.voicePrompt}
                onChange={(e)=>{props.setVoicePrompt(e.target.value)}}
            />
        </div>

        <div className='mt-5 w-full flex justify-around items-center '>

        <Button onClick={generatePodcast} type="submit" className={`text-16 bg-orange-1 py-4 font-bold text-white-1 ${isGenerating?('pointer-events-none'):''}`}>
              {isGenerating?
              (<>
              Generating
              <Loader size={20} className="animate-spin mr-2"/>
              </>) :
              (<>Generate</>)}
            </Button>
            {isGenerating?(
                <div className="flex justify-center items-center">
                    <p className="mx-auto rounded-lg p-4 mt-2 text-slate-400 text-center"> (This might take a while please wait) </p>
                </div>
                ):(
                <div className="flex justify-center items-center">
                    <p className="mx-auto rounded-lg p-4 mt-2 text-slate-400 text-center"> (Remember to Generate an audio file before Submitting) </p>
                </div>
            )}
        </div>

        { props.audio && (
            <audio src={props.audio} autoPlay controls className='mt-5' onLoadedMetadata={(e)=>{props.setAudioDuration(e.currentTarget.duration)}}/>
        )
        }

    </div>
  )
}

export default GeneratePodcast