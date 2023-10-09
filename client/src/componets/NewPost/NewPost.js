import React, { useState } from 'react';
import store from '../../store.js'
import { publicRequest } from '../../hooks/requestMethods.js';


const NewPost = () => {
  const [postContent, setPostContent] = useState('');
  const userInfo = store.getState().userInfo
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() === '') {
      alert('Post content cannot be empty.');
      return;
    }

    // You can send `postContent` to the server or handle it as needed
    
    publicRequest().post('/post', {
      userId: userInfo._id,
      desc: postContent,
    })
      .then(res => {
        window.alert('Post created successfully')
        window.location.reload()
      }
      )

    setPostContent(''); // Clear the textarea
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl mb-3">Create New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          className="w-full p-2 rounded-md border border-gray-300"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="mt-3 bg-[#BAD4A1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
