
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import AddPostModal from './AddPostModal';
import * as sessionActions from '../store/session'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import SearchNav from './SearchNav';
import { getMainFeedPosts } from '../store/mainFeedPosts';

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

  }, [dispatch, window.location.href])

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
              Intergram
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
            { window.location.href.includes('messages') ?

                <i class="fas fa-paper-plane"></i>
              :
              <i class="far fa-paper-plane"></i>

            }
            </div>
          </NavLink>

          { userId ?
              <AddPostModal />

          : ''}

          <NavLink to='/explore' exact={true} activeClassName='active'>
          <div className="nav-icon">
          { window.location.href.includes('explore') ?

               <i class="fas fa-compass"></i>

            :

            <i class="far fa-compass"></i>

            }
          </div>

          </NavLink>

        { userId ?
        <div>

          <img alt="" src={user?.avatar} className="user-avatar-nav" onClick={showMenu === false ? openMenu : closeMenu}></img>

            {showMenu && (
              <div className="avatar-navbar-icon-container">

                  <NavLink className="avatar-navbar-links" to='/profile' exact={true} activeClassName='active'>
                    Profile
                  </NavLink>



                <NavLink className="avatar-navbar-links" to='/about' exact={true} activeClassName='active'>
                  About Creator
                </NavLink>

                  <LogoutButton />
              </div>

            )}

        </div>

        : ''}

        </div>






          {userId ?
            ''
          :
          <div>
              <button id="demo-user-button" onClick={() => demoLogin()}>Demo 1</button>
              <button id="demo-user-button" onClick={() => marnieLogin()}>Demo 2</button>

          </div>}

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
