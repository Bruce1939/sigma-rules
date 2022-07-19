import React from 'react';
import { FaFireAlt } from 'react-icons/fa';
// FaFireAlt
const Like = ({ rule, handleLike, handleUnlike }) => {

    const user = JSON.parse(localStorage.getItem('user'));

  return (
      <>
        {!rule.likes.includes(user) ? (
            <>
                <FaFireAlt onClick={() => handleLike(rule._id)} size={32} style={{ color: '#ead917'}}/>
            </>
        ) : (
            <>
                <FaFireAlt onClick={() => handleUnlike(rule._id)} size={32} style={{ color: 'red' }}/>
            </>
        )} 
    </>
  )
}

export default Like