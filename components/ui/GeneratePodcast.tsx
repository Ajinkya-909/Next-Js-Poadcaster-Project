import { GeneratePodcastProps } from '@/types'

import React, { useState } from 'react'
import { Label } from './label'
import { Textarea } from './textarea'
import { Button } from './button'
import { Loader, Loader2 } from 'lucide-react'

const useGeneratePodcast = (props:GeneratePodcastProps)=>{
const [isGenerating, setisGenerating] = useState(false)
    const generatePodcast = async ()=>{
        setisGenerating(true)

        props.setAudio('')

        if (!props.voicePrompt) {
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

        <div className='mt-5 w-full max-w-[200px] '>

        <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1 ">
              {isGenerating?
              (<>
              Generating
              <Loader size={20} className="animate-spin mr-2"/>
              </>) :
              (<>Generate & Publish</>)}
            </Button>

        </div>

        { props.audio && (
            <audio src={props.audio} autoPlay controls className='mt-5' onLoadedMetadata={(e)=>{props.setAudioDuration(e.currentTarget.duration)}}/>
        )
        }

    </div>
  )
}

export default GeneratePodcast