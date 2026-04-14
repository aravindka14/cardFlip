import React, { useState, useEffect, useRef } from 'react'
import { FaUser } from "react-icons/fa6";
import SplitText from '../Split-Text';

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout =() => {
    console.log("logout click");
    sessionStorage.removeItem("user");
    window.location.href = "/login"; 
    
  }

  return (
    <header className='min-h-[88px] bg-white flex items-center justify-between border-b-[1px] border-gray-100'>
      <div >
        {/* <SplitText className='' text={`welcome `} /> */}
      </div>
      <div className='mx-10 relative' ref={dropdownRef}>
        <div onClick={()=> setIsDropdownOpen((prev) => !prev) } className='border border-gray-300 shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out p-2 rounded-full'>
          <FaUser size={20} />
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopBar