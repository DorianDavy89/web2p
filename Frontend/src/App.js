import Singin from './components/Singin';
import Pagehome from './components/Pagehome';
import Chats from './components/Chats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Singin />}/>
        <Route path='/pagehome/' element={<Pagehome />} />
        <Route path='/chats/' element={<Chats/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
