import React from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import NewPost from '../../componets/NewPost/NewPost'
import Post from '../../componets/Post/Post'
export default function 
() {
    const samplePosts = [
        {
          username: "JohnDoe",
          timestamp: "2 hours ago",
          content: "This is my first post!",
          likes: 4,
          commentList: [
            { username: 'Alice', text: 'Nice post!' },
            { username: 'Bob', text: 'I totally agree.' }
          ]
        },
        {
          username: "JaneDoe",
          timestamp: "3 hours ago",
          content: "Wow, this app is amazing!",
          likes: 7,
          commentList: [
            { username: 'Charlie', text: 'This is insightful!' },
            { username: 'David', text: 'Great post!' },
            { username: 'Eve', text: 'I totally agree.' }
          ]
        }
      ];
    
    
      return (
        <div className="App p-4 space-y-4">
            <Navbar />
          <NewPost />
          {samplePosts.map((post, index) => (
        <Post 
          key={index}
          username={post.username}
          timestamp={post.timestamp}
          content={post.content}
          likes={post.likes}
          commentList={post.commentList}
        />
      ))}
        </div>
      );
    }
    
