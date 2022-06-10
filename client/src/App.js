import React, { Fragment } from 'react';
import './App.css';
import Navbar from './Components/layout/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import About from './Components/Pages/About';
import Home from './Components/Pages/Home';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import ContactState from './Context/Contact/ContactState'
import AuthState from './Context/Auth/AuthState';

const App = () => {
  return (
    <AuthState>
    <ContactState>
    <Router>
    <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
          </Routes>
        </div>
    </Fragment>
    </Router>
      </ContactState>
      </AuthState>
  );
}

export default App;
