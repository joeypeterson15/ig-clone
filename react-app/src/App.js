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
import Channel from './components/Channel';
import Message from './components/Message';
import AboutCreator from './components/AboutCreator';
import Hashtag from './components/Hashtag';
import MainFeedOnePost from './components/MainFeedOnePost';
import HashtagPost from './components/HashtagPost';

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
          {/* <NavBar /> */}
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          {/* <NavBar /> */}
          <SignUpForm />
        </Route>
        <Route path='/about' exact={true} >
          <AboutCreator />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <MainFeed />
        </ProtectedRoute>
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
          <YourProfilePost />
        </ProtectedRoute>
        <ProtectedRoute path='/hashtags/:name' exact={true} >
          <NavBar />
          <Hashtag />
        </ProtectedRoute>
        <ProtectedRoute path='/hashtags/:name/:postId' exact={true} >
          <HashtagPost />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true} >
          <NavBar />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/messages' exact={true} >
          <NavBar />
          <Channel />
        </ProtectedRoute>
        <ProtectedRoute path='/messages/:userId/:friendId' exact={true} >
          <NavBar />
          <Channel />
          <Message />
        </ProtectedRoute>
        <ProtectedRoute path='/:postId' exact={true} >
          <Post />
        </ProtectedRoute>
        <ProtectedRoute path='/main/:postId' exact={true} >
          <MainFeedOnePost />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
