
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GenerateThumbnail from "@/components/ui/GenerateThumbnail"
import GeneratePodcast from "@/components/ui/GeneratePodcast"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/hooks/use-toast"
import { createPodcast } from "@/convex/podcasts"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

const CreatePodcast=()=> {
  const router = useRouter()
  const [imagePrompt, setimagePrompt] = useState('')
  const [imageStorageId, setimageStorageId] = useState <Id<"_storage"> | null>(null)
  const [imageUrl, setimageUrl] = useState('')
  
  const [audioStorageId, setaudioStorageId] = useState <Id<"_storage"> | any>(null) 
  const [audioUrl, setaudioUrl] = useState('')
  const [audioDuration, setaudioDuration] = useState(0)
  
  const [voiceType, setvoiceType] = useState< string | null >(null)
  const [voicePrompt, setvoicePrompt] = useState('')
  
  const [isSubmitting, setisSubmitting] = useState(false)

  const createPodcast = useMutation(api.podcasts.createPodcast)

  const {toast} = useToast()


  const voiceCatogries =["jessica","kal","bill","rachel","drew","thomas","dave","lily","arnold"];
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        podcastTitle: "",
        podcastDescription: "",
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof formSchema>) {
      try {
        setisSubmitting(true)
        if (!audioUrl || !imageUrl || !voiceType) {
          toast({
            title:"Please Generate Audio and give Image"
          })
          return setisSubmitting(false)
        }

        const podcast =await createPodcast({
          podcastTitle:data.podcastTitle,
          podcastDescription:data.podcastDescription,
          audioUrl,
          imageUrl,
          voiceType,
          voicePrompt,
          imagePrompt,
          views:0,
          audioDuration,
          audioStorageId:audioStorageId!,
          imageStorageId:imageStorageId!,
        })

        toast({
          title:"Podcast Created"
        })

        setisSubmitting(false)

        router.push('/')

      } catch (error) {
            console.log(error);
            toast({title:"Error",variant:'destructive'})
            setisSubmitting(false)
          }
    }
  return (
    <section className="mt-10 flex flex-col">
    <h1 className="text-20 font-bold text-white-1">CreatePoadCast</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-12 ">

        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
        <FormField
          control={form.control}
          name="podcastTitle"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
              <FormControl>
                <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="Podcast Name" {...field} />
              </FormControl>
              <FormMessage className="text-white-1"/>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2.5">
          <Label className="tex-16 font-bold text-white-1">
            Select AI Voice
          </Label>

          <Select onValueChange={(voice)=>{setvoiceType(voice)}}>
            <SelectTrigger className={cn("text-16 w-full border-none bg-black-1 text-gray-1  focus-visible:ring-offset-orange-1")}>
              <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1  focus-visible:ring-offset-orange-1"/>
            </SelectTrigger>
            <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus-visible:ring-offset-orange-1">

              {voiceCatogries.map((voice)=>{return (
                <SelectItem key={voice} value={voice} className="capitalize focus:bg-orange-1">{voice}</SelectItem>

              )})}
            </SelectContent>
            {
              voiceType && (
                <audio src={`AI-${voiceType}.mp3`} className="hidden" autoPlay/>
              )
            }
          </Select>


        </div>

        <FormField
          control={form.control}
          name="podcastDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
              <FormControl>
                <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Writ a short podcast Description" {...field} />
              </FormControl>
              <FormMessage className="text-white-1"/>
            </FormItem>
          )}
        />
        </div>

        <div className="flex flex-col pt-10">
          <GeneratePodcast
          setAudioStorageId={setaudioStorageId}
          setAudio={setaudioUrl}
          voiceType={voiceType!}
          audio={audioUrl}
          voicePrompt={voicePrompt}
          setVoicePrompt={setvoicePrompt}
          setAudioDuration={setaudioDuration}

          />
          <GenerateThumbnail
          setImage={setimageUrl}
          setImageStorageId={setimageStorageId}
          image={imageUrl}
          imagePrompt={imagePrompt}
          setImagePrompt={setimagePrompt}
          />

          <div className="mt-10 w-full">
            <Button type="submit" className={`text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 ${isSubmitting?('pointer-events-none'):""}`}>
              {isSubmitting?
              (<>
              Submitting
              <Loader size={20} className="animate-spin mr-2"/>
              </>) :
              (<>Submit & Publish</>)}
            </Button>
            {isSubmitting?(
              <div className="flex justify-center">
                <p className="mx-auto rounded-lg p-4 mt-2 text-slate-400 text-center"> (This might take a while please wait) </p>
              </div>
            ):""}
          </div>

        </div>

      </form>
    </Form>
    </section>
  )
}

export default CreatePodcast