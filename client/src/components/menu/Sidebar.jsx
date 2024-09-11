import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logout from './Logout';
import SelectCountry from '../general/SelectCountry';
import Notifications from '../notification/Notification';

export const Sidebar = ({ userData }) => {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("translate-x-0");
    }

    return (
        <header className="sticky top-0 z-20 bg-black text-gray-50 py-4 px-6 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
                <button onClick={showNavbar} className="text-xl md:hidden">
                    <FaBars />
                </button>
                <Link to="/profile"> 
                    <img src={userData?.picture} alt="Profile" className='h-10 w-10 rounded-full md:block hidden' />
                </Link>
                <div className="hidden md:flex md:flex-col">
                    <Link to="/profile">
                        <span>{userData?.name}</span>
                    </Link>
                </div>
            </div>
            <SelectCountry className="bg-gray-800 px-4 py-2 rounded-md flex items-center justify-between w-40" />
            <nav ref={navRef} className="fixed top-0 left-0 w-full h-full bg-gray-950 z-10 flex flex-col items-center justify-center gap-6 transform -translate-x-full transition-transform md:transform-none md:static md:w-auto md:h-auto md:flex-row md:bg-transparent md:z-auto">
                <button onClick={showNavbar} className="text-xl md:hidden absolute top-4 right-4">
                    <FaTimes />
                </button>
                <div className="md:hidden flex flex-col items-center">
                    <img src={userData?.picture} alt="Profile" className='h-10 w-10 rounded-full mb-2' />
                    <span>{userData?.name}</span>
                </div>
                <Link to={"/home"} className="hover:underline text-lg md:text-base" prefetch={false}>
                    Home
                </Link>
                <Notifications />
                <Logout className="hover:underline text-lg md:text-base" prefetch={false}>
                    Logout
                </Logout>
                <div className="relative md:hidden">
                    <SelectCountry className="bg-gray-800 px-4 py-2 rounded-md flex items-center justify-between w-40" />
                </div>
            </nav>
        </header>
    );
}
