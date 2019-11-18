import actionConstants from "../actionConstants";

export const insuranceActions = {
    createInsuranceRequest, createInsuranceSuccess, createInsuranceFailure,
    getInsuranceRequest, getInsuranceSuccess, getInsuranceFailure,
    updateInsuranceRequest, updateInsuranceSuccess, updateInsuranceFailure,
    deleteInsuranceRequest, deleteInsuranceSuccess, deleteInsuranceFailure,
};

// Create insurance
function createInsuranceRequest(payload) {
    return {
        type: actionConstants.CREATE_INSURANCE_REQUEST,
        payload
    }
}

function createInsuranceSuccess(payload) {
    return {
        type: actionConstants.CREATE_INSURANCE_SUCCESS,
        payload
    }
}

function createInsuranceFailure(payload) {
    return {
        type: actionConstants.CREATE_INSURANCE_FAILURE,
        payload
    }
}

// Get insurance
function getInsuranceRequest(payload) {
    return {
        type: actionConstants.GET_INSURANCE_REQUEST,
        payload
    }
}

function getInsuranceSuccess(payload) {
    return {
        type: actionConstants.GET_INSURANCE_SUCCESS,
        payload
    }
}

function getInsuranceFailure(payload) {
    return {
        type: actionConstants.GET_INSURANCE_FAILURE,
        payload
    }
}

// Update insurance
function updateInsuranceRequest(payload) {
    return {
        type: actionConstants.UPDATE_INSURANCE_REQUEST,
        payload
    }
}

function updateInsuranceSuccess(payload) {
    return {
        type: actionConstants.UPDATE_INSURANCE_SUCCESS,
        payload
    }
}

function updateInsuranceFailure(payload) {
    return {
        type: actionConstants.UPDATE_INSURANCE_FAILURE,
        payload
    }
}

// Delete insurance
function deleteInsuranceRequest(payload) {
    return {
        type: actionConstants.DELETE_INSURANCE_REQUEST,
        payload
    }
}

function deleteInsuranceSuccess(payload) {
    return {
        type: actionConstants.DELETE_INSURANCE_SUCCESS,
        payload
    }
}

function deleteInsuranceFailure(payload) {
    return {
        type: actionConstants.DELETE_INSURANCE_FAILURE,
        payload
    }
}

