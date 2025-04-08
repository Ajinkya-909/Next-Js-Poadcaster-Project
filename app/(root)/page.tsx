
import PodcastCard from '@/components/ui/PodcastCard'
import { podcastData } from '@/constants'
import React from 'react'

function Home() {
  return (
    <div className='mt-9 flex flex-col  gap-9'>
     <section className='flex flex-col  gap-5' >
        <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>
        <div className='podcast_grid'>

        { podcastData.map(podcast =>{
          return <PodcastCard key={podcast.id} imgURL={podcast.imgURL} title={podcast.title} description={podcast.description }  podcastId={podcast.id}/>
        })}
        </div>
      </section>
    </div>
  )
}

export default Home