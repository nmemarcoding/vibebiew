import React, { useState } from 'react';

const Post = ({ username, timestamp, content, likes, commentList }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">{username}</span>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="mt-2 mb-4">{content}</p>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{likes} Likes</span>
        <span onClick={toggleComments} className="cursor-pointer">
          {commentList.length} Comments
        </span>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-2">
          {commentList.map((c, index) => (
            <div key={index} className="text-sm text-gray-700">
              <strong>{c.username}</strong>: {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
