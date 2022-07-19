import React from 'react';
import { FaCaretUp } from 'react-icons/fa';
import '../styles/commentsection.scss';

const CommentSection = ({ toggle, setToggle, rule, handleComment }) => {

  return (
      <div className="comments">
        <form onSubmit={(e)=>{
                        e.preventDefault()
                        handleComment(e.target[0].value,rule._id)
                    }}>
            <input type="text" className="input"/>
            <button type="submit" className="comments-button">comment</button>
        </form>
        {rule.comments && (rule.comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <p>{comment.text}</p>
                    <p className="comment-user">{comment.postedBy.username}</p>
                </div>
        )))}
        <div className="close" style={{ textAlign: 'center' }}>
            <button style={{ backgroundColor: 'white', border: 'none', width: 30, height: 30 }}><FaCaretUp size={32} onClick={() => setToggle(!toggle)}/></button>
            <p style={{ marginTop: -15}}>Close Comment Section</p>
        </div>
        
    </div>
  )
}

export default CommentSection