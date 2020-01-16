import {CREATE_SERVICE} from '../actions'; //imports the different redux actions described in the actions.js file

const suggestService = (state = null, action ) => {//the leftSidebarReducer for redux
    switch ( action.type ){
        case  CREATE_SERVICE:
            return  true;
        default:
            return state;
    }
}

export {suggestService} ;
    