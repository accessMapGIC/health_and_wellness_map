import actionConstants from "../actionConstants";

export const serviceActions = {
    getPrimaryCategoryRequest, getPrimaryCategorySuccess, getPrimaryCategoryFailure,
    getSubcategoryRequest, getSubcategorySuccess, getSubcategoryFailure,
    getInsuranceRequest, getInsuranceSuccess, getInsuranceFailure,
    createServiceRequest, createServiceSuccess, createServiceFailure,
    getServiceRequest, getServiceSuccess, getServiceFailure,
};

// Get primary category
function getPrimaryCategoryRequest(payload) {
    return {
        type: actionConstants.GET_PRIMARY_CATEGORY_REQUEST,
        payload
    }
}

function getPrimaryCategorySuccess(payload) {
    return {
        type: actionConstants.GET_PRIMARY_CATEGORY_SUCCESS,
        payload
    }
}

function getPrimaryCategoryFailure(payload) {
    return {
        type: actionConstants.GET_PRIMARY_CATEGORY_FAILURE,
        payload
    }
}

// Get subategory
function getSubcategoryRequest(payload) {
    return {
        type: actionConstants.GET_SUBCATEGORY_REQUEST,
        payload
    }
}

function getSubcategorySuccess(payload) {
    return {
        type: actionConstants.GET_SUBCATEGORY_SUCCESS,
        payload
    }
}

function getSubcategoryFailure(payload) {
    return {
        type: actionConstants.GET_SUBCATEGORY_FAILURE,
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