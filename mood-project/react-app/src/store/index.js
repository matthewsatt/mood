import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session, { REMOVE_USER } from './session'
import moodlistReducer from './moodlist';
import songReducer from './songs';

const appReducer = combineReducers({
  session,
  "moodlists": moodlistReducer,
  "songs": songReducer
});

// Logging out clears everything, so the next user never sees stale data
const rootReducer = (state, action) =>
  appReducer(action.type === REMOVE_USER ? undefined : state, action);


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
