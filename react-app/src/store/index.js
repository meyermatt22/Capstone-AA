import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import profileReducer from './profiles';
import postReducer from './posts';
import userReducer from './user';
import commentReducer from './comment';
import likeReducer from './like';

const rootReducer = combineReducers({
  session,
  profiles: profileReducer,
  posts: postReducer,
  users: userReducer,
  comments: commentReducer,
  likes: likeReducer
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
