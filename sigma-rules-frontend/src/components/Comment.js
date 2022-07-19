import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import CommentSection from './CommentSection';

const Comment = ({ toggle, setToggle, rule, handleComment }) => {

  return (
    <>
        {   toggle && (
        <>
            <CommentSection toggle={toggle} setToggle={setToggle} rule={rule} handleComment={handleComment} />
        </>
        )}
        <button style={{
            backgroundColor: 'white',
            border: 'none'
        }} onClick={() => setToggle(!toggle)}>{!toggle && <FaComment size={32} />}</button>
    </>
  )
}

export default Comment