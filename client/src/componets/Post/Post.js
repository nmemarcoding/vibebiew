import React, { useState } from 'react';
import {publicRequest} from '../../hooks/requestMethods';
import store from '../../store.js'

const Post = ({ username, timestamp, content, commentList,commentUserId,postId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const userInfo = store.getState().userInfo
 
  console.log(commentUserId)
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    publicRequest().post('/comment', {
      userId: userInfo._id,
      postId: postId,
      desc: comment,
    }
    ).then(res => {
      window.alert('Comment created successfully')
      window.location.reload()
    }
    )
    .catch(err => console.log(err))

    setComment('');

  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">{username}</span>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="mt-2 mb-4">{content}</p>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{commentList.length} Comments</span>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-2">
          {/* Comment Input */}
          <div className="mt-4">
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="border rounded p-2 w-full"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-blue-500 text-white rounded p-2 w-full"
            >
              Submit Comment
            </button>
          </div>
          {commentList.map((c, index) => (
            <div key={index} className="text-sm text-gray-700">
              <strong>{c.userId.firstName} {c.userId.lastName}</strong>
              <div> {c.desc}</div>
            </div>
          ))}

          
        </div>
      )}
    </div>
  );
};

export default Post;
