import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='border flex py-2 bg-gradient-to-b from-gray-500  to-gray-900 text-white'>
      <Link to='/'><p className='text-2xl font-serif ps-2 '>PhotoBooth</p></Link>
      <div className='flex ms-auto'>
        <Link to='/camera'><p className='text-lg mx-2'>Camera</p></Link>
        <Link to='/gallery'><p className='text-lg mx-2'>Gallery</p></Link>
      </div>
    </div>
  )
}

export default Header
