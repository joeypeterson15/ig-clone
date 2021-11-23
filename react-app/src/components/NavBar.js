
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import AddPostModal from './AddPostModal';
import * as sessionActions from '../store/session'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import SearchNav from './SearchNav';

import "./NavBar.css"

const NavBar = () => {
  const userId = useSelector((state) => state.session?.user?.id)
  const user = useSelector((state) => state.session?.user)
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  // const [credential, setCredential] = useState('')
  // const [password, setPassword] = useState('')

  useEffect(() => {

    setShowMenu(false)

  }, [dispatch])

  const demoLogin = async () => {
    // setCredential("demo@aa.io")
    // setPassword("password")
    return dispatch(
      sessionActions.login("demo@aa.io", "password")
    )
  }

  const closeMenu = () => {
    setShowMenu(false);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  return (
    <nav >
      <div className="navbar-nav">

        <div className="left-side-navbar">

            <NavLink className="instagram-font-logo" to='/' exact={true} activeClassName='active'>
              Instagram
            </NavLink>

        </div>

        <div className="nav-search">
          <SearchNav />
        </div>

        <div className="right-side-nav-bar">

          <NavLink to='/' exact={true} activeClassName='active'>
            <div className="nav-icon">
              <i class="fas fa-home"></i>
            </div>
          </NavLink>


          <NavLink to='/messages' exact={true} activeClassName='active'>
          <div className="nav-icon">
              <i class="far fa-paper-plane"></i>

            </div>
            {/* <i class="fas fa-paper-plane"></i> */}
          </NavLink>

          { userId ?
              <AddPostModal />

          : ''}

          <NavLink to='/explore' exact={true} activeClassName='active'>
          <div className="nav-icon">
              <i class="far fa-compass"></i>
          </div>
            {/* <i class="fas fa-compass"></i> */}
          </NavLink>

        { userId ?
        <div>

          <img alt="" src={user?.avatar} className="user-avatar-nav" onClick={showMenu === false ? openMenu : closeMenu}></img>

            {showMenu && (
              <ul>
                <li>
                  <NavLink to='/profile' exact={true} activeClassName='active'>
                    Profile
                  </NavLink>

                </li>
                <li>
                  <LogoutButton />
                </li>
                <li>
                <NavLink to='/about' exact={true} activeClassName='active'>
                  About Creator
                </NavLink>
                </li>
              </ul>

            )}

        </div>

        : ''}

        </div>






          {userId ?
            ''
          : <button id="demo-user-button" onClick={() => demoLogin()}>Demo</button> }

          { userId ? '' :
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>}


            { userId ? '' :
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>}


      </div>
    </nav>
  );
}

export default NavBar;
