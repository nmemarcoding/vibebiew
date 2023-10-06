import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {useState,useEffect} from 'react'
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import FindFriends from './pages/FindFriends/FindFriends';
import MyFriendsPage from './pages/MyFriendsPage/MyFriendsPage';

 
function App() {

 
 
  return (
    
    <Router>
    <div className="app ">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/findfriends" element={<FindFriends/>}/>
        <Route path="/myfriends" element={<MyFriendsPage/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
