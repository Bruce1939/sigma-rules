import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.scss'

import { baseUrl as url } from '../keys';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) return navigate('/home');
    });

    const handleLogin = async (e) => {
        e.preventDefault();
       try {
           const newuser = { email, password };
           const response = await axios.post(`${url}/auth/login`, newuser);
           if (response.data.user && response.data.token) {
               localStorage.setItem('user', JSON.stringify(response.data.user));
               localStorage.setItem('token', JSON.stringify(response.data.token));
               navigate('/home')
           }
       } catch (error) {
           console.log(error)
       }
    }

  return (
      <div className="login__container">
      <h1>Log in to your <span>Sigma Account</span></h1>
      <div className="login">
          <form onSubmit={handleLogin}>
          <div className="form__container">
            <div className="input__container">
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="input__container">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
                <button type="submit">Log in</button>
                <p>Don't have an account? <Link to="/signup">Create one</Link></p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
