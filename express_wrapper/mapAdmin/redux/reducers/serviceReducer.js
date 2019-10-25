import { serviceInitialState } from "./initialState";
import actionConstants from "../actionConstants";

export default function test(state=serviceInitialState, action) {
    switch (action.type) {
        // get primary category
        case actionConstants.GET_PRIMARY_CATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.GET_PRIMARY_CATEGORY_REQUEST
            }
        case actionConstants.GET_PRIMARY_CATEGORY_SUCCESS:
            return {
                ...state,
                status: actionConstants.GET_PRIMARY_CATEGORY_SUCCESS,
                primary_category: action.payload
            }
        case actionConstants.GET_PRIMARY_CATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.GET_PRIMARY_CATEGORY_FAILURE,
                error: action.payload
            }

        // get subcategory
        case actionConstants.GET_SUBCATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.GET_SUBCATEGORY_REQUEST
            }
        case actionConstants.GET_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                status: actionConstants.GET_SUBCATEGORY_SUCCESS,
                subcategory: action.payload
            }
        case actionConstants.GET_SUBCATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.GET_SUBCATEGORY_FAILURE,
                error: action.payload
            }

        // get insurance
        case actionConstants.GET_INSURANCE_REQUEST:
            return {
                ...state,
                status: actionConstants.GET_INSURANCE_REQUEST
            }
        case actionConstants.GET_INSURANCE_SUCCESS:
            return {
                ...state,
                status: actionConstants.GET_INSURANCE_SUCCESS,
                insurance: action.payload
            }
        case actionConstants.GET_INSURANCE_FAILURE:
            return {
                ...state,
                status: actionConstants.GET_INSURANCE_FAILURE,
                error: action.payload
            }

        // create service
        case actionConstants.CREATE_SERVICE_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_SERVICE_REQUEST
            }
        case actionConstants.CREATE_SERVICE_SUCCESS:
            return {
                ...state,
                status: actionConstants.CREATE_SERVICE_SUCCESS,
                service: action.payload
            }
        case actionConstants.CREATE_SERVICE_FAILURE:
            return {
                ...state,
                status: actionConstants.CREATE_SERVICE_FAILURE,
                error: action.payload
            }
        
        // get service
        case actionConstants.GET_SERVICE_REQUEST:
            return {
                ...state,
                status: actionConstants.GET_SERVICE_REQUEST
            }
        case actionConstants.GET_SERVICE_SUCCESS:
            return {
                ...state,
                status: actionConstants.GET_SERVICE_SUCCESS,
                listing: action.payload
            }
        case actionConstants.GET_SERVICE_FAILURE:
            return {
                ...state,
                status: actionConstants.GET_SERVICE_FAILURE,
                error: action.payload
            }
        default:
            return state;
    }
}