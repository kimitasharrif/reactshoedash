import React, { useEffect, useState } from "react";
import './profile.css'
import Layout from '../layout/Layout'
import Doctor from '../../images/Doctor.jpeg';
import CheckSession from '../../helpers/CheckSession';

const Profile = () => {
  const {username, admin_id, access_token} = CheckSession();
  //get lab details from local storage
    // const admin_id = localStorage.getItem("admin_id")
    const email= localStorage.getItem("email")
    // const username = localStorage.getItem("username")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  return (
    
<>
<Layout/>

 

<h1>Admin Profile</h1>
<div className='profile-card'>
  {loading && <p className="text-warning">Loading ... </p>}
  {error && <p className="text-danger">Error occurred. Try later.</p>}

 
<div className='profile-header'>
<div className='profile-picture'>
{/* Replace with user's actual picture */}
<img src={Doctor} alt='Profile' />
</div>
<h2 className='profile-title'>{username}</h2>
</div>
<div className='profile-content'>
<div className='profile-detail'>
<strong>ID:</strong> <span>{admin_id}</span>
</div>
<div className='profile-detail'>
<strong>Permit:</strong> <span>admin.p</span>
</div>
<div className='profile-detail'>
<strong>Email:</strong> <span>{email}</span>
</div>
<div className='profile-detail'>
<strong>Phone:</strong> <span>user.phone</span>
</div>
<div className='profile-detail'>
<strong>Registration Date:</strong> <span>admin.date</span>
</div>
</div>
</div>
</>
    
   
  )
}

export default Profile
