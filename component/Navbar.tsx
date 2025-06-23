'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'

const Navbar = () => {
    const user = { id: '1234' } // Replace this with actual session logic later
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await authClient.signOut()
            toast.success('Logged out successfully.')
            router.push('/sign-in') // Redirect to the sign-in (landing) page
        } catch (err) {
            console.error(err)
            toast.error('Logout failed. Please try again.')
        }
    }

    return (
        <div className='text-3xl text-blue-800'>
            <header className='navbar'>
                <nav>
                    <Link href="/">
                        <Image src="/assets/icons/logo.svg" alt="logo image" height={32} width={32}></Image>
                        <h1><span className='text-blue-500 font-weight-200 text-2xl'>Screen</span><span className='text-2xl font-weight-200 text-purple-500'>Drop</span></h1>
                    </Link>
                    {user && (
                        <figure>
                            <button onClick={() => router.push(`/profile/${user.id}`)}>
                                <Image src="/assets/images/dummy.jpg" alt="profile image" width={36} height={36} className='rounded-full' />
                            </button>
                            <button onClick={handleLogout}>
                                <Image src="/assets/icons/logout.svg" height={24} width={24} alt="logout image" className='rotate-180' />
                            </button>
                        </figure>
                    )}
                </nav>
            </header>
        </div>
    )
}

export default Navbar
