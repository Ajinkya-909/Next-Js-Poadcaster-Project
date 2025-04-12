'use client'
import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const PoadcastDetails = ({params:{podcastId}}:{params:{podcastId:Id<'podcasts'>}}) => {
  const podcast = useQuery(api.podcasts.getPodcastById,{podcastId})
  const {user}= useUser();

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType,{podcastId})

  const isOwner = user?.id === podcast?.authorId

  if (!similarPodcasts || !podcast) {
    return <LoaderSpinner/>
  }

  return (
   <section className='flex flex-col w-full'>
    <header className='mt-9 flex justify-between items-center'>
      <h1 className='font-bold text-20 text-white-1'>
        Currently Playing
      </h1>
      <figure className='flex gap-3'>
        <Image
        src={"/icons/headphone.svg"}
        width={24}
        height={24}
        alt={"headphones"}
        />
        <h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2>
      </figure>
    </header>
    <PodcastDetailPlayer isOwner={isOwner} podcastId={podcast._id} {...podcast}/>
    <p className='text-white-2 text-16 font-medium pb-8 pt-[45px] max-md:text-center'>{podcast?.podcastDescription}</p>
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-white-1 text-18 font-bold'>Transcription</h1>
        <p className='text-white-2 text-16 font-medium'>{podcast?.voicePrompt}</p>
      </div>
    </div>
    <section className='mt-8 flex flex-col gap-5'>
      <h1 className='text-white-1 text-20 font-bold'>Similar Podcasts</h1>
      {(similarPodcasts && similarPodcasts.length > 0 )?(
         <div className='podcast_grid'>
         {similarPodcasts ? (
           similarPodcasts.map(({ _id, imageUrl, podcastDescription, podcastTitle }) => (
             <PodcastCard
               key={_id}
               imgUrl={imageUrl!}
               title={podcastTitle}
               description={podcastDescription}
               podcastId={_id!}
             />
           ))
         ) : (
           <p className="text-white-1"></p> // Show loader while waiting for data
         )}
       </div>
      ):(
        <EmptyState 
        title='No similar Podcast Found'
        buttonLink='/discover'
        buttonText='Discover more Podcasts'
        />
      )}
    </section>
   </section>
  )
}

export default PoadcastDetails