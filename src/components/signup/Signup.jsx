import React, { useState } from 'react';
import './signup.css'
import axiosInstance from '../../helpers/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [permit, setPermit] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  // Add states to see whether it's loading, success, or failure 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFailure(null); // Reset failure message before attempting signup

    try {
      const response = await axiosInstance.post('/labsignup', {
        lab_name: name,
        permit_id: permit,
        email: email,
        phone: phone,
        password: password,
      });
      console.log(response.data); // Log the response data for debugging

      setSuccess(response?.data?.message);
      setLoading(false);

      if (response?.data?.access_token && response?.data?.member) {
        // Save data to local storage
        localStorage.setItem("lab_id", response.data.member.lab_id);
        localStorage.setItem("lab_name", response.data.member.lab_name);
        localStorage.setItem("email", response.data.member.email);
        localStorage.setItem("permit_id", response.data.member.permit_id);
        localStorage.setItem("phone", response.data.member.phone);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("reg_date", response.data.member.reg_date);

        // Redirect user to home page
        navigate("/");
      } else {
        // Signup failed
        setFailure("Signup failed: Invalid response from server.");
      }
    } catch (error) {
      setLoading(false);
      setFailure(error.response?.data?.message || "Signup failed: An error occurred.");
    }
  };

  // Loading page
  if (loading) {
    return <p>Loading... please wait.</p>;
  }

  return (
    <section className='form'>
      {/* Return response for success */}
      {success && <div className='success'>{success}</div>}
      {/* Return response for failure */}
      {failure && <div className='failure'>{failure}</div>}
      <form onSubmit={handleSignup} className='card shadow p-3 pt-4'>
        <h1>Register Lab</h1>
        <div className="form-group">
          <input
            type="text"
            id="labName"
            placeholder='Enter Lab Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="permitId"
            placeholder='Enter Permit Id'
            value={permit}
            onChange={(e) => setPermit(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder='Enter Lab Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="phone"
            placeholder='Enter Lab Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder='Enter Lab Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <Link to="/signin">Already have an Account? Login</Link>
      </form>
      {name}
      <br />
      {permit}
      <br />
      {email}
      <br />
      {phone}
      <br />
      {password}
    </section>
  );
}

export default Signup;
