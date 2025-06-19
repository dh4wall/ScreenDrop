'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const user={}
    const router=useRouter();
  return (
    <div className=' text-3xl text-blue-800'>
      <header className='navbar'>
        <nav>
            <Link href="/" >
                <Image src="/assets/icons/logo.svg" alt="logo image" height={32} width={32}></Image>
                <h1><span className='text-blue-500 font-weight-200 text-2xl'>Screen</span><span className='text-2xl font-weight-200 text-purple-500'>Drop</span></h1>
            </Link>
            {user &&(
                <figure>
                    <button onClick={()=>router.push("/profile/1234")}>
                        <Image src="/assets/images/dummy.jpg" alt="profileimage" width={36} height={36} className='rounded-full'></Image>
                    </button>
                    <button>
                        <Image src="/assets/icons/logout.svg" height={24} width={24} alt="logout image" className='rotate-180'></Image>
                    </button>
                </figure>
            )}
        </nav>
      </header>
    </div>
  )
}

export default Navbar
