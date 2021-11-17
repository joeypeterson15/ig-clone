import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import myPostsReducer from './post';
import commentsReducer from './comment';
import likesReducer from './like';
import allPostsReducer from './allPost';
import userReducer from './user';

const rootReducer = combineReducers({
  session,
  myPosts: myPostsReducer,
  comments: commentsReducer,
  likes : likesReducer,
  allPosts : allPostsReducer,
  user : userReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
