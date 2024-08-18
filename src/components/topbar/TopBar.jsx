import React from 'react'
import './topbar.css'
import { AiFillCalendar ,AiOutlineAppstore} from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import CheckSession from '../../helpers/CheckSession';
import { IoMdRefresh } from "react-icons/io";


const TopBar = () => {
  const {username, admin_id, access_token} = CheckSession();

  // get lab name from local storage 
  const AdminName = localStorage.getItem("username")
  return (
    <nav className='topbar'>
      {/* leftside */}
      <div className="topbar-admin">Admin Panel </div>

      {/* right hand side */}
   <div className="topbar-content">
    
    <div className="topbar_icon">
      <button className="btn btn-light btn-sm" ><IoMdRefresh/></button>
      {/* onClick={refresh} */}
      </div>
     <div className="topbar-date">
     <AiFillCalendar />
    <span>User: {AdminName}</span>
     </div>
     <div className="topbar-icon">
    <AiOutlineAppstore/>
    <span>/</span>
    <IoMdNotifications/>
    <div className="topbar-image">
     <CgProfile/>
    </div>

   </div>
    </div>
   
    </nav>
  )
}

export default TopBar
