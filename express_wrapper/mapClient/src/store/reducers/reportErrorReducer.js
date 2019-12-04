import {REPORT_ERROR} from '../actions' //imports the different redux actions described in the actions.js file


const reportError = (state = null, action ) => {//the leftSidebarReducer for redux
    switch ( action.type ){
        case REPORT_ERROR:
            return true
        default:
            return state;
    }
}

export {reportError} ;
    