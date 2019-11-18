import { insuranceInitialState } from "./initialState";
import actionConstants from "../actionConstants";

export default function test(state=insuranceInitialState, action) {
    switch (action.type) {
       // create primary category
       case actionConstants.CREATE_INSURANCE_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_INSURANCE_REQUEST
            }
        case actionConstants.CREATE_INSURANCE_SUCCESS:
            return {
                ...state,
                status: actionConstants.CREATE_INSURANCE_SUCCESS,
                insurance: state.insurance.concat(action.payload)
            }
        case actionConstants.CREATE_INSURANCE_FAILURE:
            return {
                ...state,
                status: actionConstants.CREATE_INSURANCE_FAILURE,
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

        // update primary category
        case actionConstants.UPDATE_INSURANCE_REQUEST:
            return {
                ...state,
                status: actionConstants.CREATE_INSURANCE_REQUEST
            }
        case actionConstants.UPDATE_INSURANCE_SUCCESS:
            var newInsurance = state.insurance;
            var index = newInsurance.findIndex(c => { return c.insur_id === action.payload.insur_id});
            newInsurance[index] = action.payload;
            return {
                ...state,
                status: actionConstants.UPDATE_INSURANCE_SUCCESS,
                insurance: newInsurance
            }
        case actionConstants.UPDATE_INSURANCE_FAILURE:
            return {
                ...state,
                status: actionConstants.UPDATE_INSURANCE_FAILURE,
                error: action.payload
            }

        // delete primary category
        case actionConstants.DELETE_INSURANCE_REQUEST:
            return {
                ...state,
                status: actionConstants.DELETE_INSURANCE_REQUEST
            }
        case actionConstants.DELETE_INSURANCE_SUCCESS:
            newInsurance = state.insurance.filter(item => item.insur_id !== action.payload.insur_id)
            return {
                ...state,
                status: actionConstants.DELETE_INSURANCE_SUCCESS,
                insurance: newInsurance
            }
        case actionConstants.DELETE_INSURANCE_FAILURE:
            return {
                ...state,
                status: actionConstants.DELETE_INSURANCE_FAILURE,
                error: action.payload
            }
       
        default:
            return state;
    }
}