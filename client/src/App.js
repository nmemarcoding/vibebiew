import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {useState} from 'react'
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import FindFriends from './pages/FindFriends/FindFriends';
import MyFriendsPage from './pages/MyFriendsPage/MyFriendsPage';
import store from './store.js'
 
function App() {
  const userInfo = store.getState().userInfo
  const [userExists, setUserExists] = useState(false);
  // if userInfo is not empty object set userExists to true
  if (Object.keys(userInfo).length !== 0) {
    setUserExists(true);
  }
  return (
    
    <Router>
    <div className="app ">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/" element={(userExists) ? <HomePage/> : <LoginPage/>}/>
        <Route path="/findfriends" element={(userExists)? <FindFriends/> : <LoginPage/>}/>
        <Route path="/myfriends" element={(userExists)? <MyFriendsPage/> : <LoginPage/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
