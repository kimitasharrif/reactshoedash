import React, { useState } from 'react';
import './signin.css';
import axiosInstance from '../../helpers/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate()

  const handleSignin = (e) => {
    e.preventDefault();
    setLoading(true);

   
    axiosInstance.post('/adminsignin', {
        username: username,
        password: password,
      })
      .then((response)=>{
      // setSuccess(response?.data?.message);
      // console.log(response.data)
      // setFailure(null);
      setLoading(false)
      // handle the response 
      if(response?.data && response?.data?.access_token && response?.data?.message){
        // alert("Login successiful")
        // save data to local storage 
        localStorage.setItem("admin_id",response?.data?.message?.admin_id)
        localStorage.setItem("email",response?.data?.message?.email)
        localStorage.setItem("username",response?.data?.message?.username)
        localStorage.setItem("phone",response?.data?.message?.phone)
        localStorage.setItem("access_token",response?.data?.access_token)
        


        // redirect to home page 
        navigate("/")



        
      }else{
        // LOGIN FAILED 
        setFailure("Login Failed")
      }
         

      })
      . catch ((error)=> {
      setFailure(error.message);
      setSuccess(null);
    })
  }
  if (loading) {
    return <p>Loading...... please wait.</p>;
  }

  return (
    <section className='form'>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>{failure}</div>}

      
      <form onSubmit={handleSignin} className='card shadow p-3 pt-4'>
        <h1>ADMIN LOGIN</h1>
        <div className="form-group">
          <input
            type="username"
            id="username"
            placeholder='Enter admin username'
            className="form-control"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder='Enter admin password'
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <Link to="/signup">Don't have an Account? Create one</Link>
      </form>

    
    </section>
  );
};

export default Signin;





