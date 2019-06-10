import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; //added applyMiddleware for thunk
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import leftSidebarReducer from './store/reducers/leftSidebarReducer';
import rightSidebarReducer from './store/reducers/rightSidebarReducer';
import mapboxReducer from './store/reducers/mapboxReducer';
import languageReducer from './store/reducers/languageReducer';
// import { devToolsEnhancer } from 'redux-devtools-extension';
// import dbReducer from './store/reducers/dbReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //to apply thunk if dev tools exist

//With chrone Redux Devtools
const store = createStore(
  combineReducers({
      lfS: leftSidebarReducer,
      rtS: rightSidebarReducer,
      mpB: mapboxReducer,
      lang: languageReducer
  }),
  composeEnhancers(applyMiddleware(ReduxThunk))
)
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.register();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
