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
import Alerts from './Components/layout/Alerts';
import PrivateRoute from './Components/Routing/PrivateRoute';
import ContactState from './Context/Contact/ContactState'
import AuthState from './Context/Auth/AuthState';
import AlertState from './Context/Alert/AlertState';
import setAuthToken from './Utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
    <Router>
    <Fragment>
        <Navbar />
              <div className="container">
                <Alerts/>
          <Routes>
            <Route exact path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
          </Routes>
              </div>
    </Fragment>
    </Router>
         </AlertState>
      </ContactState>
     </AuthState>
  );
}

export default App;
