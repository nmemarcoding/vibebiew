import React, { useState, useEffect } from 'react';
import Navbar from '../../componets/Navbar/Navbar';
import { publicRequest } from '../../hooks/requestMethods';
import store from '../../store.js'

export default function FindFriends() {
    const [users, setUsers] = useState([]);
    const userInfo = store.getState().userInfo

    useEffect(() => {
        // Fetch all users that the current user can view
       publicRequest().get('auth/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddFriend = (FriendId) => {
        // Add the user with the given userId as a friend
        publicRequest().put('auth/addfriend', {
            userId: userInfo._id,
            friendId: FriendId
        })
            .then(res => {
                window.alert(res.data);
            })
            .catch(err => {
                window.alert(err.request.response
                    );
            });
    };

    return (
        <>
        <Navbar/>
        <div className="flex flex-col items-center mt-[20px]">
            <h1 className="text-3xl font-bold mb-8">Find Friends</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">{user.firstName} {user.lastName}</h2>
                        <p className="text-gray-500 mb-4">{user.email}</p>
                        <button
                            className="bg-[#BAD4A1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAddFriend(user._id)}
                        >
                            Add Friend
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
