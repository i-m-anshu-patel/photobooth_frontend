import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../utils/redux/userSlice';
import { FaBars } from 'react-icons/fa'; // Breadcrumb icon

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown menu
  const userData = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    return navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center py-4 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white">
      {/* Logo */}
      <Link to="/" className="hover:text-gray-300 transition duration-300 z-10">
        <p className="md:text-3xl sm:text-xl font-serif tracking-wider text-white drop-shadow-lg">
          Fotoautomatica
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex ms-auto space-x-6 z-10">
        <Link to="/camera" className="hover:text-yellow-400 transition duration-300">
          <p className="md:text-lg sm:text-md font-medium text-white drop-shadow-md">
            Camera
          </p>
        </Link>
        <Link to="/settings" className="hover:text-yellow-400 transition duration-300">
          <p className="md:text-lg sm:text-md font-medium text-white drop-shadow-md">
            Settings
          </p>
        </Link>
        {userData && (
          <button
            className="mx-2 px-2 py-1 bg-red-500 text-white rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden ms-auto z-10">
        <button onClick={toggleMenu} className="text-white text-2xl">
          <FaBars />
        </button>
        {isMenuOpen && (
          <div className="absolute right-4 top-16 bg-gray-800 rounded-md shadow-lg text-white">
            <Link
              to="/camera"
              onClick={toggleMenu}
              className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition duration-300"
            >
              Camera
            </Link>
            <Link
              to="/settings"
              onClick={toggleMenu}
              className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition duration-300"
            >
              Settings
            </Link>
            {userData && (
              <button
                onClick={() => {
                  handleSignOut();
                  toggleMenu();
                }}
                className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 transition duration-300"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
