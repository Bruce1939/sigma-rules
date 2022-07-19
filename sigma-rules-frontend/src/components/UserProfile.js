import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Rule from './Rule';

const UserProfile = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState('');
    const [rules, setRules] = useState([]);
    const [editProfile, setEditProfile] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) return navigate('/login');
        if (String(user._id) === loggedInUser) setEditProfile(true);
    })

    console.log(user);
    console.log(typeof user);

    useEffect(() => {
        getUserProfile(id);
    }, []);

    const getUserProfile = async (id) => {
        const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
        const response = await axios.get(`http://localhost:5000/user/${id}`, { headers });
        console.log(response)
        if (response.data.user && response.data.rules) {
            setUser(response.data.user);
            setRules(response.data.rules);
        }
    }

    const handleFollow = async (userId) => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.put(`http://localhost:5000/user/follow/${userId}`, {}, { headers });
            console.log(response);
            if (response.data.followedUser && response.data.followedUserRules) {
                setUser(response.data.followedUser);
                setRules(response.data.followedUserRules);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.put(`http://localhost:5000/user/unfollow/${userId}`, {},{ headers });
            console.log(response);
            if (response.data.unfollowedUser && response.data.unfollowedUserRules) {
                setUser(response.data.unfollowedUser);
                setRules(response.data.unfollowedUserRules);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteRule = async (id) => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.delete(`http://localhost:5000/rule/deleterule/${id}`, { headers });
            console.log(response);
            if (response.data.ruleDeleted) {
            const newRules = rules.filter((rule) => rule._id !== id);
            setRules(newRules);
        }
        } catch (error) {
            console.log(error);
        }
    }


    const handleLike = async (id) => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.put(`http://localhost:5000/rule/like/${id}`,{}, { headers });
            console.log(response);
            if (response.data.rule) {
            const newRules = rules.map((rule) => rule._id.toString() !== id.toString() ? rule : response.data.rule);
            setRules(newRules);
        }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnlike = async (id) => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.put(`http://localhost:5000/rule/unlike/${id}`,{}, { headers });
            console.log(response);
            if (response.data.rule) {
            const newRules = rules.map((rule) => rule._id.toString() !== id.toString() ? rule : response.data.rule);
            setRules(newRules);
        }
        } catch (error) {
            console.log(error);
        }
    }

    const handleComment = async (text, id) => {
        try {
            const comment = { text };
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.put(`http://localhost:5000/rule/comment/${id}`, comment, { headers });
            console.log(response);
            if (response.data.rule) {
            const newRules = rules.map((rule) => rule._id.toString() !== id.toString() ? rule : response.data.rule);
            setRules(newRules);
        }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="user-profile">
        { 
            user && (
                <div className="user-container">
                    <div className="user">
                        <p className="user-name">{user.username}</p>
                        <p className="user-followers">Followers: {user.followers.length}</p>
                        <p className="user-following">Following: {user.following.length}</p>
                        <p className="user-posts">Posts: {rules.length}</p>
                    {/* <> */}
                    </div>
                    {!editProfile ? user && user.followers.includes(loggedInUser) ? <button onClick={() => handleUnfollow(user._id)} className="profile-btn">unfollow</button> : <button className="profile-btn" onClick={() => handleFollow(user._id)}>follow</button> : null}
                    {editProfile && (<button className="profile-btn">Welcome to your profile {user.username}</button>)}
                    {/* </> */}
                </div>
            )
        }
        {
            rules && rules.map((rule) => (
                <div key={rule._id}>
                <Rule 
                    rule={rule} 
                    handleDeleteRule={handleDeleteRule}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    handleComment={handleComment}    
                />
                </div>
            ))
        }
        
    </div>
  )
}

export default UserProfile;