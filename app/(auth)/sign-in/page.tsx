'use client'

import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  const handleSignIn= async()=>{
      return authClient.signIn.social({provider:"google"})
  }
  return (
    <main className='sign-in'>
      <aside className='testimonial'>
        <Link href="/">
        
        <Image src="/assets/icons/logo.svg" alt="logo"
        height={32} width={32}></Image>
        <h1><span className='text-blue-500 font-weight-200 text-2xl'>Screen</span><span className='text-2xl font-weight-200 text-purple-500'>Drop</span></h1>
        </Link>

        <div className='description'>
          <section>
              <figure>
                {Array.from({length:5}).map((_, index)=>(
                  <Image src="/assets/icons/star.svg" alt='star' height={20} width={20}/>
                ))}
              </figure>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui fugiat, consectetur qxcepturi molestiae ?</p>
              <article>
                <Image src="/assets/images/jason.png" alt="random dude" height={64} width={64} className='rounded-full aspect-square' />
                <div>
                  <h2>Jason Godbole</h2>
                  <p>"software dev at Crunchyroll"</p>
                </div>
              </article>
          </section>
        </div>
        <p>©ScreenDrop {(new Date()).getFullYear()}</p>
      </aside>
      <aside className='google-sign-in'>
        <section>
          <Link href="/">
                <Image src="/assets/icons/logo.svg" alt="logo"
        height={40} width={40}></Image>
        <h1><span className='text-blue-500 font-weight-200 text-2xl'>Screen</span><span className='text-2xl font-weight-200 text-purple-500'>Drop</span></h1>
          </Link>
          <p>
            create you own <span>ScreenDrop</span> and share!!
          </p>

          <button className='' onClick={handleSignIn}>
                <Image src="/assets/icons/google.svg" alt="google icon" height={22} width={22} />
                <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className='overlay'/>
    </main>

  )
}

export default page
