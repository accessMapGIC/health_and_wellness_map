import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

