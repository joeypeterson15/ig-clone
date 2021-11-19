
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import AddPostModal from './AddPostModal';
import * as sessionActions from '../store/session'
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import "./NavBar.css"

const NavBar = () => {
  const userId = useSelector((state) => state.session?.user?.id)
  const dispatch = useDispatch()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')

  const demoLogin = async () => {
    setCredential("demo@aa.io")
    setPassword("password")
    return dispatch(
      sessionActions.login("demo@aa.io", "password")
    )
  }

  return (
    <nav >
      <ul className="navbar-nav">
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        
        { userId ? '' :
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>}


          { userId ? '' :
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>

          }

        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/messages' exact={true} activeClassName='active'>
            DM's
          </NavLink>
        </li>
        <li>
          <NavLink to='/explore' exact={true} activeClassName='active'>
            Explore
          </NavLink>
        </li>
        { userId ? <li>
          <NavLink to='/profile' exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
        : ''}
        { userId ?
            <AddPostModal />

        : ''}

         { userId ?
          <LogoutButton />
        : ''}

        <li>
          <NavLink to='/about' exact={true} activeClassName='active'>
            About Creator
          </NavLink>
        </li>

          {userId ?
            ''
          : <button id="demo-user-button" onClick={() => demoLogin()}>Demo</button> }

      </ul>
    </nav>
  );
}

export default NavBar;
