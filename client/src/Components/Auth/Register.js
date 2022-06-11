import React, { useContext, useState } from 'react'
import AlertContext from '../../Context/Alert/AlertContext';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [user, setUser] = useState({
        name: "",
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Password do not match', 'danger');
        } else {
            console.log("Registered User");
        console.log(user);
        }
        

    }
  return (
      <div className='form-container'>
          <h1>
              Account <span className='text-primary'>Register</span>
          </h1>
          <form onSubmit={onSubmit}>
              <div className='form-group'>
                  <lable htmlFor="name">Name</lable>
                  <input type='text' name="name" value={name} onChange={onChange} required/>
              </div>
              <div className='form-group'>
                  <lable htmlFor="email">Email</lable>
                  <input type='email' name="email" value={email} onChange={onChange} required/>
              </div>
              <div className='form-group'>
                  <lable htmlFor="password">Password</lable>
                  <input type='password' name="password" value={password} onChange={onChange} required/>
              </div>
              <div className='form-group'>
                  <lable htmlFor="password2"> Confirm Password</lable>
                  <input type='password' name="password2" value={password2} onChange={onChange} required/>
              </div>
              <input type="submit" value="Register" className="btn btn-primary btn-black"/>
          </form>
          
    </div>
  )
}

export default Register