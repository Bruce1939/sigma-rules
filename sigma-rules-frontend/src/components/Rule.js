import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Like from './Like';
import Comment from './Comment';
import '../styles/rule.scss';

const Rule = ({ rule, handleDeleteRule, handleLike, handleUnlike, handleComment }) => {

  const [toggle, setToggle] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="rule">
      
      <div className="rule__header">
        {/* <div className="rule__userimage"></div> */}
        <Link className="rule__username" to={`/userprofile/${rule.postedBy._id}`} id={rule._id}>{rule.postedBy.username}</Link>
      </div>
      
      <div className="rule__body">
        <p className="rule__rule">{rule.rule}</p>
        { rule.image && <img className="rule__image" src={rule.image} />}
      </div>

        {(user === rule.postedBy._id) && <button onClick={() => handleDeleteRule(rule._id)} className="delete-rule">Delete</button>}
        
        <div className="rule__footer">
          <div className="like">
            {!toggle && <><Like rule={rule} handleLike={handleLike} handleUnlike={handleUnlike} />
            <p className="rule__likes">{rule.likes.length} SP</p></>}
          </div>
          <Comment toggle={toggle} setToggle={setToggle} rule={rule} handleComment={handleComment} />
        </div>
    </div> 
  )
}

export default Rule;