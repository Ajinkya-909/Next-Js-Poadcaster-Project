'use client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import Headers from "@/components/Headers"
import Carousel from "@/components/Carousel"
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import LoaderSpinner from './LoaderSpinner'
import { useAudio } from '@/providers/AudioProvider'
import { cn } from '@/lib/utils'




const RightSidebar = () => {
  const {user}= useUser()
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount)
  const router = useRouter()
  const {audio}=useAudio()
  if (!topPodcasters) return <LoaderSpinner/>

  return (
   <section className={cn('right_sidebar h-calc[100vh-5px] text-white-1',{'h-calc[100vh-140px]':audio?.audioUrl})}>
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className='flex gap-3 pb-12'>
          <UserButton/>
        <div className='flex items-center justify-between w-full'>
        <h1 className='text-16 font-bold text-white-1 truncate'>{user?.firstName}{user?.lastName}</h1>
        <Image src={'/icons/right-arrow.svg'} alt='arrow' height={24}  width={24}/>
        </div>
        </Link>
      </SignedIn>
      <section>
        <Headers headerTitle='Fans Like You' TitleClassName=''/>
        <Carousel fansLikeDetail={topPodcasters!}/>
      </section>
      <section className='flex flex-col gap-8 pt-12'>

        <Headers headerTitle='Top Podcasters' TitleClassName=''/>
        <div className='flex flex-col gap-8'>
          {topPodcasters?.slice(0,4).map((podcaster)=>{
            return (<div key={podcaster._id} className='flex cursor-pointer justify-between' onClick={()=>{router.push(`/profile/${podcaster.clerkId}`)}}>
              <figure className='flex gap-2 items-center'>

              <Image src={podcaster.imageUrl} alt={podcaster.name} width={44} height={44} className='aspect-square rnded-lg'/>
              <h2 className='text-14 font-semibold text-white-1'>{podcaster.name}</h2>
              </figure>
              <div className='flex items-center'>
                <p className='text-12 font-normal'>{podcaster.totalPodcasts} podcasts</p>
              </div>
            </div>)
          })}

        </div>
      </section>
    </section>
  )
}

export default RightSidebar