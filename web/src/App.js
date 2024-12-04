import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import IdentificationScreen from './pages/IdentificationScreen';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Signup/>} path='/sign-up' />
          <Route element={<IdentificationScreen/>} path='/sign-in' />
          <Route element={<IdentificationScreen/>} path='/identification' />
          
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
