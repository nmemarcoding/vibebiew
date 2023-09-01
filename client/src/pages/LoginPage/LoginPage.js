import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethods';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    publicRequest().post('/auth/login', formData)
      .then(res => {
        console.log(res.data);
       
      }
      )
      .catch(err => console.log(err));

   
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 sm:p-8 rounded-lg sm:shadow-md w-full sm:w-96 sm:border">
        <div className="flex justify-center mb-6">
          <span className="text-4xl font-bold text-[#6F9A47]">VibeView</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input 
              type="text" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
              placeholder="Email" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
              placeholder="Password" 
            />
          </div>
          <button type="submit" className="w-full bg-[#BAD4A1]  p-2 rounded-md hover:bg-blue-600 mb-4">Login</button>
        </form>
        <div className="text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <a href="/signup" className="text-[#6F9A47] font-bold ml-2 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
