
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
  // const [credential, setCredential] = useState('')
  // const [password, setPassword] = useState('')

  const demoLogin = async () => {
    // setCredential("demo@aa.io")
    // setPassword("password")
    return dispatch(
      sessionActions.login("demo@aa.io", "password")
    )
  }

  return (
    <nav >
      <div className="navbar-nav">


          <NavLink className="instagram-font-logo" to='/' exact={true} activeClassName='active'>
            Instagram
          </NavLink>



          <NavLink to='/' exact={true} activeClassName='active'>
            <i class="fas fa-home"></i>
          </NavLink>



        { userId ? '' :
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>}


          { userId ? '' :
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>}


          <NavLink to='/messages' exact={true} activeClassName='active'>
            <i class="far fa-paper-plane"></i>
            {/* <i class="fas fa-paper-plane"></i> */}
          </NavLink>

          { userId ?
              <AddPostModal />

          : ''}

          <NavLink to='/explore' exact={true} activeClassName='active'>
            <i class="far fa-compass"></i>
            {/* <i class="fas fa-compass"></i> */}
          </NavLink>

        { userId ?
          <NavLink to='/profile' exact={true} activeClassName='active'>
            Profile
          </NavLink>

        : ''}

         { userId ?
          <LogoutButton />
        : ''}

       
          <NavLink to='/about' exact={true} activeClassName='active'>
            About Creator
          </NavLink>


          {userId ?
            ''
          : <button id="demo-user-button" onClick={() => demoLogin()}>Demo</button> }

      </div>
    </nav>
  );
}

export default NavBar;
