import {GET_INSURANCE_REQUEST, GET_PRIMARY_CATEGORY_REQUEST, GET_SUBCATEGORY_REQUEST, CREATE_SERVICE} from '../actions' //imports the different redux actions described in the actions.js file


const loadPrimaryCategory = (state = null, action ) => {//the leftSidebarReducer for redux
    switch ( action.type ){
        case GET_PRIMARY_CATEGORY_REQUEST:
            return action.payload
        default:
                return state;
    }
}

const loadSubCategory = (state = null, action ) => {
    switch ( action.type ){
        case GET_SUBCATEGORY_REQUEST :
            return action.payload
        default:
                return state;
    }
}

const loadInsurance = (state = null, action ) => {//the leftSidebarReducer for redux
    switch ( action.type ){
        case  GET_INSURANCE_REQUEST:
            return action.payload
        default:
                return state;
    }
}

const suggestService = (state = null, action ) => {//the leftSidebarReducer for redux
    switch ( action.type ){
        case  CREATE_SERVICE:
            return  true
        default:
            return state;
    }
}

export {loadPrimaryCategory, loadSubCategory, loadInsurance, suggestService} ;
    