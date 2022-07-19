import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.scss';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) return navigate('/home');
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userdata = { username, email, password };
      const response = await axios.post('http://localhost:5000/auth/signup', userdata);
      console.log(response);
      if (response.data.user) return navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup__container">
      <h1>Create a <span>Free Account</span></h1>
      <div className="signup">
          <form onSubmit={handleSignup}>
            <div className="form__container">
            <div className="input__container">
              <label htmlFor="username">Username</label>
                <input 
                  type="text"  
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
            </div>
            <div className="input__container">
              <label htmlFor="email">Email</label>
                <input 
                  type="email"  
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
            </div> 
            <div className="input__container">
              <label htmlFor="password">Password</label>
                <input 
                  type="password"  
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
            </div> 
            <button type="submit">Submit Details</button>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
