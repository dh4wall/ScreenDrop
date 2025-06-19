'use client'
import Image from 'next/image';
import React from 'react'
import { useState } from 'react'

const Dropdownlist = () => {
    const [isopen,setisopen]=useState(false);
    return (

    <div className='relative'>
        <div className='cursor-pointer' onClick={()=>setisopen(!isopen)}>

            <div className='filter-trigger'>
                <figure>
                    <Image src="/assets/icons/hamburger.svg" alt='hamburger image' width={14}  height={14}/>
                    Most recent
                    
                </figure>
                <Image src="/assets/icons/arrow-down.svg" alt="down arrow" width={20} height={20}/>
            </div>
        </div>
        {isopen && (
            <ul className='dropdown'>
                {['most recent','most liked'].map((option)=>(
                    <li key={option} className='list-item'>
                        {option}
                    </li>
                ))}
            </ul>
        )}

    </div>
  )
}

export default Dropdownlist
