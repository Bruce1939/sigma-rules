import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Rule from '../components/Rule';

const Home = () => {

    const navigate = useNavigate();
    const [rules, setRules] = useState('');

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) return navigate('/login');
    })

    useEffect(() => {
        getRules();
    }, [])

    const getRules = async () => {
        try {
            const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
            const response = await axios.get('http://localhost:5000/rule/getallrules', { headers });
            if (response.data.rules) setRules(response.data.rules.reverse());
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
        <div className="home">
            { rules && (
                rules.map((rule) => (
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
            )}
        </div>
    );
};

export default Home;
