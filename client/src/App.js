import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import FindFriends from './pages/FindFriends/FindFriends';
 
function App() {
  return (
    
    <Router>
    <div className="app ">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/findfriends" element={<FindFriends/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
