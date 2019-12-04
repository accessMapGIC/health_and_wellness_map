import { feedbackInitialState } from "./initialState";
import actionConstants from "../actionConstants";

export default function test(state=feedbackInitialState, action) {
    switch (action.type) {
        // get primary category
        case actionConstants.GET_REPORTED_ERROR_REQUEST:
            return {
                ...state,
                status: actionConstants.GET_REPORTED_ERROR_REQUEST
            }
        case actionConstants.GET_REPORTED_ERROR_SUCCESS:
            return {
                ...state,
                status: actionConstants.GET_REPORTED_ERROR_SUCCESS,
                reported_Error: action.payload
            }
        case actionConstants.GET_REPORTED_ERROR_FAILURE:
            return {
                ...state,
                status: actionConstants.GET_REPORTED_ERROR_FAILURE,
                error: action.payload
            }
       
        //Delete service
        case actionConstants.DELETE_REPORTED_ERROR_REQUEST:
            return {
                ...state,
                status: actionConstants.DELETE_REPORTED_ERROR_REQUEST,
        }
        case actionConstants.DELETE_REPORTED_ERROR_SUCCESS:
            let newReported_Error = state.reported_Error.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                status: actionConstants.DELETE_REPORTED_ERROR_SUCCESS,
                reported_Error: newReported_Error
            }
        case actionConstants.DELETE_REPORTED_ERROR_FAILURE:
            return {
                ...state,
                status: actionConstants.DELETE_REPORTED_ERROR_FAILURE,
                error: action.payload
            }

        default:
            return state;
    }
}