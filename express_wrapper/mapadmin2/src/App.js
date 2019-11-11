// React, routing
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { withRouter, Router } from 'react-router';

// Redux
import { createStore, applyMiddleware } from 'redux';
import {Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas/rootSaga.js';
import rootReducer from './redux/reducers/rootReducer.js';
import { authActions } from './redux/actions/authActions';
import  actionConstants from './redux/actionConstants';

// Style
import en_US from 'antd/lib/locale-provider/en_US';
import { Layout, ConfigProvider, Row, Col, Button } from 'antd';
import Index from './index.jsx';
import './App.css';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer(history),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// (na) console log the state
const unsubscribe = store.subscribe(()=>console.log(store.getState()));

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={en_US}>
          <Provider store={store}>
              <ConnectedRouter history={history}> 
                <Index />
              </ConnectedRouter>
          </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
