import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import serviceReducer from "./serviceReducer";
import auth from "./authReducers"
import categoryReducer from "./categoryReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    serviceReducer,
    auth,
    categoryReducer
})