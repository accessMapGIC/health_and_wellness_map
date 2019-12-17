import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import serviceReducer from "./serviceReducer";
import auth from "./authReducers"
import categoryReducer from "./categoryReducer";
import insuranceReducer from "./insuranceReducer";
import feedbackReducer from "./feedbackReducers";
import searchTermReducers from "./searchTermReducers";

export default (history) => combineReducers({
    router: connectRouter(history),
    serviceReducer,
    auth,
    categoryReducer,
    insuranceReducer,
    feedbackReducer,
    searchTermReducers
})