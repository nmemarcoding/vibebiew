import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    
    <Router>
    <div className="app ">
      <Routes>
        <Route path="/" element={<>hi</>}/>
        
      </Routes>
    </div>
  </Router>
  );
}

export default App;
