import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='border flex py-2'>
      <p className='text-2xl font-serif ps-2'>PhotoBooth</p>
      <div className='flex ms-auto'>
        <Link to='/camera'><p className='text-lg ps-2'>Camera</p></Link>
        <Link to='/gallery'><p className='text-lg ps-2'>Gallery</p></Link>
      </div>
    </div>
  )
}

export default Header
