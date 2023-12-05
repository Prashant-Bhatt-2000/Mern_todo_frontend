import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/common/NavBar';
import Completed from './components/Tasks/Completed';
import SoftDeleted from './components/Tasks/SoftDeleted';
import Login from './components/auth/Login';
import Createuser from './components/auth/Createuser';

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Createuser/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/completedtasks" element={<Completed/>}/>
          <Route path="/softdeleted" element={<SoftDeleted/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
