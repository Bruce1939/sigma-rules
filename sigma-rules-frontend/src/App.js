import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AddRule from './components/AddRule';
import Navbar from './components/Navbar';

import UserProfile from './components/UserProfile';

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/add" element={<AddRule />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
