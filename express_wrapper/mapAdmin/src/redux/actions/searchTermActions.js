import actionConstants from "../actionConstants";

export const searchTermActions = {
    getSearchTermRequest, getSearchTermSuccess, getSearchTermFailure,
};

// Get Rported Errors
function getSearchTermRequest(payload) {
    return {
        type: actionConstants.GET_SEARCH_TERM_REQUEST,
        payload
    }
}

function getSearchTermSuccess(payload) {
    return {
        type: actionConstants.GET_SEARCH_TERM_SUCCESS,
        payload
    }
}

function getSearchTermFailure(payload) {
    return {
        type: actionConstants.GET_SEARCH_TERM_FAILURE,
        payload
    }
}