import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    
    <Router>
    <div className="app ">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/" element={<>home</>}/>
        
      </Routes>
    </div>
  </Router>
  );
}

export default App;
