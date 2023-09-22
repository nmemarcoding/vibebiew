import React from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import NewPost from '../../componets/NewPost/NewPost'
import Post from '../../componets/Post/Post'
import store from '../../store.js'
import {publicRequest} from '../../hooks/requestMethods.js'
export default function 
() {
    const userInfo = store.getState().userInfo
    // fettching posts from server
    const [posts, setPosts] = React.useState([])
    React.useEffect(() => {
        publicRequest().get('/post/timeline/' + userInfo._id)
            .then(res => {
                // reverse posts array to show latest posts first
                

                setPosts(res.data.reverse())
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            }
            )
    }, [])
    
    
    
    
      return (
        <div className="App p-4 space-y-4">
            <Navbar />
          <NewPost />
          {posts?.map((post, index) => (
        <Post 
          key={index}
          username={`${post?.userId?.firstName} ${post?.userId?.lastName}`}
          timestamp={new Date(post.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(",", "")}
          content={post.desc}
          likes={post.likes.length}
          commentList={post.comments}
          postId={post._id}
          commentUserId={userInfo._id}
        
        />
      ))}
        </div>
      );
    }
    
