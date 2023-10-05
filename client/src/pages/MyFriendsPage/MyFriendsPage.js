import React from 'react'
import Navbar from '../../componets/Navbar/Navbar'

export default function MyFriendsPage() {
    const friends = [
        {
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
            status: 'online'
        },
        {
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/150',
            status: 'offline'
        },
        {
            name: 'Bob Johnson',
            avatar: 'https://via.placeholder.com/150',
            status: 'online'
        }
    ];

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex-grow bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-4">My Friends</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {friends.map((friend, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full mb-4" />
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-bold text-center">{friend.name}</h2>
                                <p className={`text-sm ${friend.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>{friend.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
