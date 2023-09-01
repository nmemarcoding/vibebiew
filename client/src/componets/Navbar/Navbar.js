import React, { useState } from 'react';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const username = "JohnDoe"; // Replace with the actual username

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-semibold text-[#6F9A47]">VibeView</span>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <a href="#" className="text-gray-600">Home</a>
          <a href="#" className="text-gray-600">Explore</a>
          <a href="#" className="text-gray-600">Profile</a>
          <span className="text-gray-600 ml-4">{username}</span>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-gray-600" onClick={toggleMobileMenu}>
            <i className="fas fa-bars text-[#6F9A47]"></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-300">
          <div className="max-w-screen-lg mx-auto px-4 py-2">
            <span className="block py-2 text-gray-600">{username}</span>
            <a href="#" className="block py-2 text-gray-600">Home</a>
            <a href="#" className="block py-2 text-gray-600">Explore</a>
            <a href="#" className="block py-2 text-gray-600">Profile</a>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
