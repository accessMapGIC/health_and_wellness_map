import actionConstants from "../actionConstants";

export const feedbackActions = {
    getReportedErrorRequest, getReportedErrorSuccess, getReportedErrorFailure,
    deleteReportedErrorRequest, deleteReportedErrorSuccess, deleteReportedErrorFailure
};

// Get Rported Errors
function getReportedErrorRequest(payload) {
    return {
        type: actionConstants.GET_REPORTED_ERROR_REQUEST,
        payload
    }
}

function getReportedErrorSuccess(payload) {
    return {
        type: actionConstants.GET_REPORTED_ERROR_SUCCESS,
        payload
    }
}

function getReportedErrorFailure(payload) {
    return {
        type: actionConstants.GET_REPORTED_ERROR_FAILURE,
        payload
    }
}

// Delete Rported Errors
function deleteReportedErrorRequest(payload) {
    return {
        type: actionConstants.DELETE_REPORTED_ERROR_REQUEST,
        payload
    }
}

function deleteReportedErrorSuccess(payload) {
    return {
        type: actionConstants.DELETE_REPORTED_ERROR_SUCCESS,
        payload
    }
}

function deleteReportedErrorFailure(payload) {
    return {
        type: actionConstants.DELETE_REPORTED_ERROR_FAILURE,
        payload
    }
}