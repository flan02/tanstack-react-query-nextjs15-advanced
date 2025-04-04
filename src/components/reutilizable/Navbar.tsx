import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='bg-black py-4 text-end'>
      <Link href='/' className='px-4 py-2 font-bold mr-4'>
        <Image src='/tanstack-logo.png' alt="logo" width={50} height={50} className='inline-block mr-2' />
      </Link>
    </div>
  )
}

export default Navbar