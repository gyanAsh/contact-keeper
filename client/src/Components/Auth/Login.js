import React, { useContext, useState, useEffect } from 'react'
import AlertContext from '../../Context/Alert/AlertContext';
import AuthContext from '../../Context/Auth/AuthContext';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const { setAlert } = alertContext;
    const { login,error,clearErrors,isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error === 'Invalid Credentials') {
            setAlert(error,'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    },[error,isAuthenticated,navigate])

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const {email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill all details', 'danger');
        } else {
            login(user);
        }

    }
  return (
      <div className='form-container'>
          <h1>
              Account <span className='text-primary'>Login</span>
          </h1>
          <form onSubmit={onSubmit}>
              <div className='form-group'>
                  <label htmlFor="email">Email</label>
                  <input type='email' name="email" value={email} onChange={onChange} required/>
              </div>
              <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type='password' name="password" value={password} onChange={onChange} required/>
              </div>
              <input type="submit" value="Login" className="btn btn-primary btn-black"/>
          </form>
    </div>
  )
}

export default Register