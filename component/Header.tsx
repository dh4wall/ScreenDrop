import { ICONS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Dropdownlist from './Dropdownlist'

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
    return (
        <header className='header'>
            <section className='header-container'>
                <div className='details'>
                    {userImg &&
                        (<Image src={userImg } alt=" userimage" height={66} width={66} />

                        )}

                    <article>
                        <p>{subHeader}</p>
                        <h1>
                            {title}
                        </h1>
                    </article>
                </div>
                <aside>
                    <Link href="/upload">
                        <Image src={"/assets/icons/upload.svg"} alt="upload image" height={16} width={16}></Image>
                        <span>upload a video</span>
                    </Link>

                    <div className='record'>
                        <button className='primary-btn'>
                            <Image src={ICONS.record} alt='record image' height={16} width={16} ></Image>
                            <span>record a video</span>
                        </button>
                    </div>


                </aside>
            </section>

            <section className='search-filter'>
                <div className='search'>
                    <input type="text" placeholder='search for files,videos....' />
                    <Image src="/assets/icons/search.svg" width={16}
                        height={16} alt="search bar image" />
                </div>
                <Dropdownlist/>
            </section>

        </header>
    )
}

export default Header
