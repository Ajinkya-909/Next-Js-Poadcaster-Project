import React, { use, useRef, useState } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Textarea } from './textarea'
import { GenerateThumbnailProps } from '@/types'
import { Input } from './input'
import Image from 'next/image'
import { log } from 'console'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from 'convex/react'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { api } from '@/convex/_generated/api'

const GenerateThumbnail = ({setImage,setImageStorageId,image,imagePrompt,setImagePrompt}:GenerateThumbnailProps) => {
  const [isImageLoading, setisImageLoading] = useState(false)

      const generateUploadUrl = useMutation(api.files.generateUploadUrl)
      const {startUpload}= useUploadFiles(generateUploadUrl)
      const getImageUrl = useMutation(api.podcasts.getUrl)

  const {toast} = useToast()

  const imageRef = useRef<HTMLInputElement>(null)

  const handleImage=async(blob:Blob,fileName:string)=>{
    setisImageLoading(true)
    setImage('')

    try {

     const file = new File([blob], fileName,{type:'image/png'})


     const uploaded= await startUpload([file])
     const storageId= (uploaded[0].response as any).storageId

     setImageStorageId(storageId)

     const imageUrl = await getImageUrl({storageId})
     setImage(imageUrl!)
     setisImageLoading(false)
     toast({
      title: "Image Generated Successfully",
    })
   
    } catch (error) {
      console.log(error);
      toast({title:"Error in Generating Image",variant:'destructive'})
    }
  }
  const generateImage= async ()=>{}
  const uploadImage= async (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    try {
      const files = e.target.files
      if(!files) return
      const file = files[0]
      const blob = await file.arrayBuffer().then((ab)=>new Blob([ab]));

      handleImage(blob!,file.name)
    } catch (error) {
      console.log(error);
      toast({title:"Error in Uploading Image",variant:'destructive'})
    }
  }

  return (
    <div className='mt-4'>
      <h2 className='font-bold text-16 text-white-1 '>Give a Thumbnail For Your Podcast </h2>
      
        <div className='image_div' onClick={()=>{imageRef.current?.click()}}>
          <Input 
          type='file'
          className='hidden'
          ref={imageRef}
          onChange={(e)=>{uploadImage(e)}}
          >
          </Input>
          {!isImageLoading?(
            <Image src={'/icons/upload-image.svg'} width={30} height={40} alt='Upload'/>
          ):(
            <div className='text-16 flex-center font-medium text-white-1'>
              Generating
              <Loader size={20} className="animate-spin mr-2"/>
            </div> 
          )}
          <div className='flex flex-col items-center gap-1'>
            <h2 className='text-12  font-bold text-orange-1'>Click to Uplolad</h2>
            <p className='text-12 font-medium text-gray-1'>SVG,PNG,JPG or GIF (max. 1080 X 1080)</p>
          </div>
        </div>
      

      {image && (
        <div className='flex-center w-full'>
          <Image 
          src={image}
          height={200}
          width={200}
          alt='thumbnail'
          className='mt-5'
          />
        </div>
      )}

    </div>
  )
}

export default GenerateThumbnail