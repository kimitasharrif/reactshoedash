import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import { AiOutlineBank } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaUserNurseSolid } from "react-icons/lia";
import { FaHospitalAlt } from "react-icons/fa";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import CheckSession from '../../helpers/CheckSession';

const NavBar = () => {
    const { username, admin_id, access_token } = CheckSession();

    return (
        <nav className='navbar'>
            <div className="navbar-left">
                <div className="sidebar-brand">
                    <AiOutlineBank />
                    <span>SNEAKER HUB</span>
                </div>
            </div>
            <div className="navbar-links">
                <ul>
                    <li><Link to="/"><IoIosAddCircleOutline /> Dashboard</Link></li>
                    <li><Link to="/profile"><CgProfile /> My Profile</Link></li>
                    <li><Link to="/addshoe"><MdOutlineLocalHospital /> Add Shoe</Link></li>
                    <li><Link to="/shoes"><FaHospitalAlt /> View Shoe</Link></li>
                    <li><Link to="/orders"><FaBook /> View Orders</Link></li>
                    <li><Link to="/addcategory"><MdOutlinePersonAddAlt1 /> Add Category</Link></li>
                    <li><Link to="/categories"><LiaUserNurseSolid /> Category</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
