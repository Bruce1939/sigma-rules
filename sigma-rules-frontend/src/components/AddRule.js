import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import axios from 'axios';

const Add = () => {

  const [rule, setRule] = useState('');
  const [image, setImage] = useState('');
    const navigate = useNavigate();
 
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) return navigate('/login');
    })

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };
        const data = { rule, image };
        const response = await axios.post('http://localhost:5000/rule/addrule', data, { headers });
        if (response.data.created) navigate('/home');
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
      <h1 className="add-post-header">Create your post</h1>
      <div className="add-post">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="add-post-input"
            placeholder="Post your sigma rule here"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          />
          <br />
          <FileBase 
              type="file"
              multiple={false}
              onDone={({base64}) => setImage(base64)}
              className="filebase"
          />
          <br />
          <button type="submit" className="add-rule">Post</button>
        </form>
      </div>
    </>
  )
}

export default Add