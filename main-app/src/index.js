import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import leftSidebarReducer from './store/reducers/leftSidebarReducer';
import rightSidebarReducer from './store/reducers/rightSidebarReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    lfS: leftSidebarReducer,
    rtS: rightSidebarReducer,
});

const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
serviceWorker.register();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

