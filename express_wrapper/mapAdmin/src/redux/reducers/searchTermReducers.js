import { searchTermInitialState } from "./initialState";
import actionConstants from "../actionConstants";

export default function searchTerm(state=searchTermInitialState, action) {
    switch (action.type) {
        // get searchTerm
        case actionConstants.GET_SEARCH_TERM_REQUEST:
            return {
                ...state,
                status: actionConstants.GET_SEARCH_TERM_REQUEST
            }
        case actionConstants.GET_SEARCH_TERM_SUCCESS:
            return {
                ...state,
                status: actionConstants.GET_SEARCH_TERM_SUCCESS,
                Search_Term: action.payload
            }
        case actionConstants.GET_SEARCH_TERM_FAILURE:
            return {
                ...state,
                status: actionConstants.GET_SEARCH_TERM_FAILURE,
                error: action.payload
            }

        default:
            return state;
    }
}