import React from 'react'
import Wrapper from './Wrapper'
import Link from 'next/link'
import { Icons } from './Icons'
import NavItems from './NavItems'

const Navbar = () => {
  return (
    <div className='mg-white sticky top-0 z-50 inset-x-0 h-16'>
        <header className='relative bg-white'>
            <Wrapper>
                <div className='border-b border-gray-200'>
                    <div className='flex h-16 items-center'>

                        {/* TODO: mobile nav */}
                        <div className='ml-4 flex lg:ml-0'>
                            <Link href={"/"}><Icons.logo className='h-10 w-10' /></Link>
                        </div>
                    </div>

                    <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                        <NavItems />
                    </div>
                </div>
            </Wrapper>
        </header>
    </div>
  )
}

export default Navbar