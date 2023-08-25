import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 sm:p-8 rounded-lg sm:shadow-md w-full sm:w-96 sm:border">
        <div className="flex justify-center mb-6">
          <span className="text-4xl font-bold text-blue-500">VibeView</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full p-2 border rounded-md" 
              placeholder="Username" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 border rounded-md" 
              placeholder="Password" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-4">Login</button>
        </form>
        <div className="text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <a href="/signup" className="text-blue-500 ml-2 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

