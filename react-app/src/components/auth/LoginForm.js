import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const demoLogin = async () => {
    // setCredential("demo@aa.io")
    // setPassword("password")
    return dispatch(
      sessionActions.login("demo@aa.io", "password"),
    )
  }
  const marnieLogin = async () => {
    // setCredential("demo@aa.io")
    // setPassword("password")
    return dispatch(
      sessionActions.login("marnie@aa.io", "password"),
    )
  }

  return (
    <div className="outer-container">

      <div className="phone-picture-container">

      <a href="https://ibb.co/Tk5dysv"><img src="https://i.ibb.co/f27LJs1/instagram-phone-picture.png" alt="instagram-phone-picture" border="0"></img></a>
      </div>

        <div className="login-card">
          <div id="instagram-font-logo">Outergram</div>
            <form onSubmit={onLogin}>
                <div>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div>
                  {/* <label htmlFor='email'>Email</label> */}
                  <input className="login-input"
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div>
                  {/* <label htmlFor='password'>Password</label> */}
                  <input className="login-input"
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                  <button id="demo-user-button" onClick={() => demoLogin()}>Demo 1</button>
                    <button id="demo-user-button" onClick={() => marnieLogin()}>Demo 2</button>
                  <button id="login-login-button" type='submit'>Login</button>
                </div>
            </form>
        </div>
                <div className="signup-in-login-card">
                    Don't have an account? <Link to="/sign-up">Sign up</Link>
                </div>
                <div className="demo-logins-box">
                    <button id="demo-user-button" onClick={() => demoLogin()}>Demo 1</button>
                    <button id="demo-user-button" onClick={() => marnieLogin()}>Demo 2</button>
                </div>

    </div>
  );
};

export default LoginForm;
