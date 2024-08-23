import React from 'react'
import './topbar.css'
import '../../index.css'
import { AiFillCalendar ,AiOutlineAppstore} from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import CheckSession from '../../helpers/CheckSession';
import { IoMdRefresh } from "react-icons/io";
import ReactLogout from '../../helpers/Logout';



const TopBar = () => {
  const {username, admin_id, access_token} = CheckSession();
const  {logout} = ReactLogout()


  // get lab name from local storage 
  const AdminName = localStorage.getItem("username")
  return (
    <nav className='topbar'>
      {/* leftside */}
      <div className="topbar-admin">Admin Panel </div>

      {/* right hand side */}
   <div className="topbar-content">
    
     <div className="topbar-date">
     {/* <AiFillCalendar /> */}
    <span>User: {AdminName}</span>
     </div>
     <div className="topbar-icon">
    {/* <AiOutlineAppstore/>
    <span>/</span> */}
    <div className="topbar-image">
     <CgProfile/>
    </div>
    <div>
      <IoMdNotifications/>
    </div>
    
  {/* logout division */}
  {/* <div className="p-4 sidebar-logout"> */}
      <button className="btn btn-dark btn-sm" onClick={logout}>Log Out</button>

   {/* </div> */}

   </div>
    </div>
   
    </nav>
  )
}

export default TopBar
