import Header from '@/component/Header'
import VideoCard from '@/component/VideoCard'
import { dummyCards } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    
    <main className='wrapper page'>
      <Header title="all videos" subHeader='public library'/>
      <div>hello this will be my home page</div>

      <section className='video-grid'>
        {dummyCards.map((card)=>
      <VideoCard key={card.id} {... card}></VideoCard>)}
      </section>
      
    </main>
  )
}

export default Page