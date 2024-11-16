import React from "react";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo or App Name */}
        <div className="text-lg font-bold">FotoAutomatica</div>

        {/* Links Section */}
        <div className="flex flex-row space-x-6 mt-4 md:mt-0">
          <Link to="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link to="/contact-us" className="hover:underline">
            Contact Us
          </Link>
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/products-and-services" className="hover:underline">
            Products and Services
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} FotoAutomatica. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
