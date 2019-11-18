import actionConstants from "../actionConstants";

export const serviceActions = {
    createServiceRequest, createServiceSuccess, createServiceFailure,
    getServiceRequest, getServiceSuccess, getServiceFailure,
    editServiceRequest, editServiceSuccess, editServiceFailure
};

// Create service
function createServiceRequest(payload) {
    return {
        type: actionConstants.CREATE_SERVICE_REQUEST,
        payload
    }
}

function createServiceSuccess(payload) {
    return {
        type: actionConstants.CREATE_SERVICE_SUCCESS,
        payload
    }
}

function createServiceFailure(payload) {
    return {
        type: actionConstants.CREATE_SERVICE_FAILURE,
        payload
    }
}

// Get service
function getServiceRequest(payload) {
    return {
        type: actionConstants.GET_SERVICE_REQUEST,
        payload
    }
}

function getServiceSuccess(payload) {
    return {
        type: actionConstants.GET_SERVICE_SUCCESS,
        payload
    }
}

function getServiceFailure(payload) {
    return {
        type: actionConstants.GET_SERVICE_FAILURE,
        payload
    }
}

//Edit service
function editServiceRequest(payload) {
    return {
        type: actionConstants.EDIT_SERVICE_REQUEST,
        payload
    }
}

function editServiceSuccess(payload) {
    return {
        type: actionConstants.EDIT_SERVICE_SUCCESS,
        payload
    }
}

function editServiceFailure(payload) {
    return {
        type: actionConstants.EDIT_SERVICE_FAILURE,
        payload
    }
}