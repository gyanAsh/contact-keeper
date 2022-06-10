import React,{useState} from 'react'

const Register = () => {
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
        console.log("User LoggedIn");
        console.log(user);

    }
  return (
      <div className='form-container'>
          <h1>
              Account <span className='text-primary'>Login</span>
          </h1>
          <form onSubmit={onSubmit}>
              <div className='form-group'>
                  <lable htmlFor="email">Email</lable>
                  <input type='email' name="email" value={email} onChange={onChange}/>
              </div>
              <div className='form-group'>
                  <lable htmlFor="password">Password</lable>
                  <input type='password' name="password" value={password} onChange={onChange}/>
              </div>
              <input type="submit" value="Login" className="btn btn-primary btn-black"/>
          </form>
    </div>
  )
}

export default Register