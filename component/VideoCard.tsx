'use client'

import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VideoCard = ({
    id,
    title,
    thumbnail,
    createdAt,
    userImg,
    username,
    views,
    visibility,
    duration
}:VideoCardProps) => {
  return (
    <Link href={`/video/${id}`} className='video-card'>
        <Image src={thumbnail} alt="thumbnail image" height={160} width={290} className='thumbnail'></Image>
        <article className=''>
            <div>
                <figure>
                    <Image src={userImg} alt="userimg" width={34} height={34} className='rounded-full aspect-square'/>
                    <figcaption>
                        <h3>{username}</h3>
                        <p>{visibility}</p>
                    </figcaption>
                </figure>
                <aside>
                    <Image src="/assets/icons/eye.svg" alt='views' height={16} width={16}></Image>
                    <span>{views}</span>
                </aside>
            </div>
            <h2>{title}-{" "} {createdAt.toLocaleDateString('en-US' ,{
                year:"numeric",
                month:"short",
                day:"numeric"
            })}</h2>
        </article>
        <button onClick={()=>{}} className='copy-btn'>
            <Image src="/assets/icons/link.svg" alt='link icon' height={18} width={18}></Image>
        </button>
        {duration && 
        <div className="duration" >
            {Math.ceil(duration/60)}min
            </div>}
    </Link>
  )
}

export default VideoCard
