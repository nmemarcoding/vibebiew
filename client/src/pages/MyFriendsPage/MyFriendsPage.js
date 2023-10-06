import React, { useState, useEffect as UseEffect } from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import { publicRequest } from '../../hooks/requestMethods'
import store from '../../store.js'

export default function MyFriendsPage() {
    const userId = store.getState().userInfo._id;
    const [friends, setFriends] = useState([]);
    // fettching friends list
    UseEffect(() => {
        publicRequest().put('auth/friends', {
            userId: userId
        })
            .then(res => {
                setFriends(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    , []);
    
    const removeFriend = (friendId) => {
        publicRequest().put('auth/removefriend', {
            userId: userId,
            friendId: friendId
        })
            .then(res => {
                setFriends(friends.filter(friend => friend._id !== friendId));
                window.alert(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex-grow bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-4">My Friends</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {friends.map((friend, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img src={"https://via.placeholder.com/150"} alt={friend.name} className="w-16 h-16 rounded-full mb-4" />
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-bold text-center">{friend.firstName} {friend.lastName}</h2>
                                <p className={`text-sm ${friend.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>{friend.status}</p>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeFriend(friend._id)}>Remove Friend</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
