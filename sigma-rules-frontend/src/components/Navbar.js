import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div className="navbar__container">
        <div className="navbar">
            { !user ? (
            <>
                <h1>SigmaRules</h1>
                <div className="navbar__links">
                    <Link to="/login">login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </>
            ) : (
            <>
                <h1><Link to="/home">SigmaRules</Link></h1>
                <div className="navbar__links">
                    <button onClick={handleLogout}>Logout</button>
                    <Link to="/add">Create Rule</Link>
                    <Link to={`/userprofile/${user}`}>Your Profile</Link>
                </div>
            </>
            )}
        </div>
    </div>
  )
}

export default Navbar