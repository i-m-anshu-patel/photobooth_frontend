import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../utils/redux/userSlice';

const Header = () => {
  const userData = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(signOut());
    return navigate('/');
  }
  return (
    <div className='flex py-4 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white'>
      <Link to='/' className='hover:text-gray-300 transition duration-300 z-10'>
        <p className='text-3xl font-serif tracking-wider text-white drop-shadow-lg'>PhotoBooth</p>
      </Link>
      <div className='flex ms-auto space-x-6 z-10'>
        <Link to='/camera' className='hover:text-yellow-400 transition duration-300'>
          <p className='text-lg font-medium text-white drop-shadow-md'>Camera</p>
        </Link>
        <Link to='/settings' className='hover:text-yellow-400 transition duration-300'>
          <p className='text-lg font-medium text-white drop-shadow-md'>Settings</p>
        </Link>
        { userData && (
          <button className='mx-2 px-2 py-1 bg-red-500 text-white rounded' onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
    </div>
  )
}

export default Header
