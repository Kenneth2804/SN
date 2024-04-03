import React from 'react'
import { useRef } from 'react'
import {Link} from "react-router-dom"
import {FaBars, FaTimes, FaHome } from "react-icons/fa"
import Logout from './Logout';
import "../../css/sidebar.css"
import SelectCountry from '../general/SelectCountry';

export const Sidebar = ({ userData }) => {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("move_nav");
    }

    return (
        <header>
            <div className='aas' style={{marginRight: 'auto'}}>
                <SelectCountry />
            </div>
            <button className='nava' onClick={showNavbar} style={{marginLeft: 'auto'}}>
                <FaBars />
            </button>
            <nav ref={navRef}>
                <button className='nava close' onClick={showNavbar}>
                    <FaTimes />
                </button>
                {userData ? (
                    <React.Fragment>
                        <a><img src={userData?.picture} alt="Profile" className='profilepic' /></a>
                        <Link className='profilename' to="/profile" style={{ fontWeight: 'bold' }}>{userData.name}</Link>
                        <Link to={"/home"}><FaHome style={{ color: 'black', fontSize: '30px' }}/></Link>
                        {/* Se elimina el SelectCountry de esta sección ya que se movió al inicio */}
                        <a><Logout /></a> 
                    </React.Fragment>
                ) : (
                    <p>User not found</p>
                )}
            </nav>
        </header>
    )
}
