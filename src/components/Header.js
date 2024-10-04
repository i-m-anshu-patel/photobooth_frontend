import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex py-4 px-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 '>
      
      
      <Link to='/' className='hover:text-gray-300 transition duration-300 z-10'>
        <p className='text-3xl font-serif tracking-wider text-white drop-shadow-lg'>PhotoBooth</p>
      </Link>
      <div className='flex ms-auto space-x-6 z-10'>
        <Link to='/camera' className='hover:text-yellow-400 transition duration-300'>
          <p className='text-lg font-medium text-white drop-shadow-md'>Camera</p>
        </Link>
        <Link to='/gallery' className='hover:text-yellow-400 transition duration-300'>
          <p className='text-lg font-medium text-white drop-shadow-md'>Gallery</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
