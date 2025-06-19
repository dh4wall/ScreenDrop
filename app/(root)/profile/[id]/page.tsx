import Header from '@/component/Header';
import VideoCard from '@/component/VideoCard';
import { dummyCards } from '@/constants';
import React from 'react'

const page =async ({params}:ParamsWithSearch) => {
  const {id}=await params;

  return (
    <div className=' wrapper page'>
      <Header subHeader='fruitchinousamurai ' title="dh4wall" />
      <div className='text-2xl font-karla' >the id is: {id}</div>
      <section className='video-grid'>
        {dummyCards.map((card)=>
      <VideoCard key={card.id} {... card}></VideoCard>)}
      </section>
    </div>
  )
}

export default page
