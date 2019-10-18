import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import serviceReducer from "./serviceReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    serviceReducer
})