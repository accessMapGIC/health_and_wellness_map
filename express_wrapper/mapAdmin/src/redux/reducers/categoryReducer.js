import { categoryInitialState } from "./initialState";
import actionConstants from "../actionConstants";

export default function category(state=categoryInitialState, action) {
    switch (action.type) {
        // create primary category
        case actionConstants.CREATE_PRIMARY_CATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_PRIMARY_CATEGORY_REQUEST
            }
        case actionConstants.CREATE_PRIMARY_CATEGORY_SUCCESS:
            return {
                ...state,
                status: actionConstants.CREATE_PRIMARY_CATEGORY_SUCCESS,
                primary_category: state.primary_category.concat(action.payload)
            }
        case actionConstants.CREATE_PRIMARY_CATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.CREATE_PRIMARY_CATEGORY_FAILURE,
                error: action.payload
            }

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

        // update primary category
        case actionConstants.UPDATE_PRIMARY_CATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_PRIMARY_CATEGORY_REQUEST
            }
        case actionConstants.UPDATE_PRIMARY_CATEGORY_SUCCESS:
            var newPrimaryCategory = state.primary_category;
            var index = newPrimaryCategory.findIndex(c => { return c.cat_id === action.payload.cat_id});
            newPrimaryCategory[index] = action.payload;
            return {
                ...state,
                status: actionConstants.UPDATE_PRIMARY_CATEGORY_SUCCESS,
                primary_category: newPrimaryCategory
            }
        case actionConstants.UPDATE_PRIMARY_CATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.UPDATE_PRIMARY_CATEGORY_FAILURE,
                error: action.payload
            }

        // delete primary category
        case actionConstants.DELETE_PRIMARY_CATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.DELETE_PRIMARY_CATEGORY_REQUEST
            }
        case actionConstants.DELETE_PRIMARY_CATEGORY_SUCCESS:
            newPrimaryCategory = state.primary_category.filter(item => item.cat_id !== action.payload.cat_id)
            return {
                ...state,
                status: actionConstants.DELETE_PRIMARY_CATEGORY_SUCCESS,
                primary_category: newPrimaryCategory
            }
        case actionConstants.DELETE_PRIMARY_CATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.DELETE_PRIMARY_CATEGORY_FAILURE,
                error: action.payload
            }

        // create subcategory
        case actionConstants.CREATE_SUBCATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_SUBCATEGORY_REQUEST
            }
        case actionConstants.CREATE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                status: actionConstants.CREATE_SUBCATEGORY_SUCCESS,
                subcategory: state.subcategory.concat(action.payload)
            }
        case actionConstants.CREATE_SUBCATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.CREATE_SUBCATEGORY_FAILURE,
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

        // update subcategory
        case actionConstants.UPDATE_SUBCATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_SUBCATEGORY_REQUEST
            }
        case actionConstants.UPDATE_SUBCATEGORY_SUCCESS:
            var newSubcategory = state.subcategory;
            var index = newSubcategory.findIndex(c => { return c.subcat_id === action.payload.subcat_id});
            newSubcategory[index] = action.payload;
            return {
                ...state,
                status: actionConstants.UPDATE_SUBCATEGORY_SUCCESS,
                subcategory: newSubcategory
            }
        case actionConstants.UPDATE_SUBCATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.UPDATE_SUBCATEGORY_FAILURE,
                error: action.payload
            }

        // delete primary category
        case actionConstants.DELETE_SUBCATEGORY_REQUEST:
            return {
                ...state,
                status: actionConstants.DELETE_SUBCATEGORY_REQUEST
            }
        case actionConstants.DELETE_SUBCATEGORY_SUCCESS:
            newSubcategory = state.subcategory.filter(item => item.subcat_id !== action.payload.subcat_id)
            return {
                ...state,
                status: actionConstants.DELETE_SUBCATEGORY_SUCCESS,
                subcategory: newSubcategory
            }
        case actionConstants.DELETE_SUBCATEGORY_FAILURE:
            return {
                ...state,
                status: actionConstants.DELETE_SUBCATEGORY_FAILURE,
                error: action.payload
            }

        
        default:
            return state;
    }
}