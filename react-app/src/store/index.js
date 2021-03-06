import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import myPostsReducer from './post';
import commentsReducer from './comment';
import likesReducer from './like';
import allPostsReducer from './allPost';
import userReducer from './user';
import userPostsReducer from './userPost';
import followsReducer from './follow';
import mainFeedPostsReducer from './mainFeedPosts';
import mainCommentsReducer from './mainComments';
import mainLikesReducer from './mainLikes';
import channelReducer from './channel';
import allUsersReducer from './allUsers';
import messageReducer from './message';
import hashReducer from './hashtag';
import hashPostReducer from './hashposts';
import EveryPostsReducer from './everyPost';
import followersReducer from './followers';
import allFollowsReducer from './allFollows';
import CommentLikesReducer from './commentLikes';
import repliesReducer from './reply';
import yourMessageReducer from './yourMessage';
import ReplyLikesReducer from './replyLike';

const rootReducer = combineReducers({
  session,
  myPosts: myPostsReducer,
  comments: commentsReducer,
  likes : likesReducer,
  allPosts : allPostsReducer,
  user : userReducer,
  userPosts : userPostsReducer,
  follows: followsReducer,
  mainFeedPosts: mainFeedPostsReducer,
  mainFeedComments : mainCommentsReducer,
  mainLikes : mainLikesReducer,
  channels : channelReducer,
  allUsers : allUsersReducer,
  messages : messageReducer,
  hashtags : hashReducer,
  hashPosts : hashPostReducer,
  posts: EveryPostsReducer,
  followers: followersReducer,
  allFollows: allFollowsReducer,
  commentLikes: CommentLikesReducer,
  replies : repliesReducer,
  yourmessages: yourMessageReducer,
  replylikes : ReplyLikesReducer
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
