import { combineReducers, createStore, compose } from 'redux';
import authReducer from './reducers/authReducer';
import flashReducer from './reducers/flashReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  flash: flashReducer,
});

const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
