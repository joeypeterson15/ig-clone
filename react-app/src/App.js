import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Profile from './components/Profile';
import Post from './components/Post';
import Explore from './components/Explore';
import YourPost from './components/YourPost';
import UserProfile from './components/UserProfile';
import YourProfilePost from './components/YourProfilePost/YourProfilePost';
import MainFeed from './components/MainFeed';
import Search from './components/Search';
import Channel from './components/Channel';
import Message from './components/Message';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <NavBar />
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
         <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/explore' exact={true} >
          <NavBar />
          <Explore />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <YourPost />
        </ProtectedRoute>
        <ProtectedRoute path='/p/:userId' exact={true} >
          <NavBar />
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/p/:userId/:postId' exact={true} >
          <NavBar />
          <YourProfilePost />
        </ProtectedRoute>
        <ProtectedRoute path='/hashtags/:hashtag' exact={true} >
          <NavBar />
          <h3>Hashtag page</h3>
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true} >
          <NavBar />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/messages' exact={true} >
          <NavBar />
          <Channel />
        </ProtectedRoute>
        <ProtectedRoute path='/messages/:userId/:friendId/:channelId' exact={true} >
          <NavBar />
          <Channel />
          <Message />
        </ProtectedRoute>
        <ProtectedRoute path='/:postId' exact={true} >
          <Post />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <MainFeed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
