import actionConstants from "../actionConstants";

export const categoryActions = {
    createPrimaryCategoryRequest, createPrimaryCategorySuccess, createPrimaryCategoryFailure,
    getPrimaryCategoryRequest, getPrimaryCategorySuccess, getPrimaryCategoryFailure,
    updatePrimaryCategoryRequest, updatePrimaryCategorySuccess, updatePrimaryCategoryFailure,
    deletePrimaryCategoryRequest, deletePrimaryCategorySuccess, deletePrimaryCategoryFailure,

    createSubcategoryRequest, createSubcategorySuccess, createSubcategoryFailure,
    getSubcategoryRequest, getSubcategorySuccess, getSubcategoryFailure,
    updateSubcategoryRequest, updateSubcategorySuccess, updateSubcategoryFailure,
    deleteSubcategoryRequest, deleteSubcategorySuccess, deleteSubcategoryFailure,
};

// Create primary category
function createPrimaryCategoryRequest(payload) {
    return {
        type: actionConstants.CREATE_PRIMARY_CATEGORY_REQUEST,
        payload
    }
}

function createPrimaryCategorySuccess(payload) {
    return {
        type: actionConstants.CREATE_PRIMARY_CATEGORY_SUCCESS,
        payload
    }
}

function createPrimaryCategoryFailure(payload) {
    return {
        type: actionConstants.CREATE_PRIMARY_CATEGORY_FAILURE,
        payload
    }
}

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
        type: actionConstants.UPDATE_PRIMARY_CATEGORY_FAILURE,
        payload
    }
}

// Update primary category
function updatePrimaryCategoryRequest(payload) {
    return {
        type: actionConstants.UPDATE_PRIMARY_CATEGORY_REQUEST,
        payload
    }
}

function updatePrimaryCategorySuccess(payload) {
    return {
        type: actionConstants.UPDATE_PRIMARY_CATEGORY_SUCCESS,
        payload
    }
}

function updatePrimaryCategoryFailure(payload) {
    return {
        type: actionConstants.UPDATE_PRIMARY_CATEGORY_FAILURE,
        payload
    }
}

// Delete primary category
function deletePrimaryCategoryRequest(payload) {
    return {
        type: actionConstants.DELETE_PRIMARY_CATEGORY_REQUEST,
        payload
    }
}

function deletePrimaryCategorySuccess(payload) {
    return {
        type: actionConstants.DELETE_PRIMARY_CATEGORY_SUCCESS,
        payload
    }
}

function deletePrimaryCategoryFailure(payload) {
    return {
        type: actionConstants.DELETE_PRIMARY_CATEGORY_FAILURE,
        payload
    }
}

// Create subcategory
function createSubcategoryRequest(payload) {
    return {
        type: actionConstants.CREATE_SUBCATEGORY_REQUEST,
        payload
    }
}

function createSubcategorySuccess(payload) {
    return {
        type: actionConstants.CREATE_SUBCATEGORY_SUCCESS,
        payload
    }
}

function createSubcategoryFailure(payload) {
    return {
        type: actionConstants.CREATE_SUBCATEGORY_FAILURE,
        payload
    }
}

// Get subcategory
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
        type: actionConstants.UPDATE_SUBCATEGORY_FAILURE,
        payload
    }
}

// Update subcategory
function updateSubcategoryRequest(payload) {
    return {
        type: actionConstants.UPDATE_SUBCATEGORY_REQUEST,
        payload
    }
}

function updateSubcategorySuccess(payload) {
    return {
        type: actionConstants.UPDATE_SUBCATEGORY_SUCCESS,
        payload
    }
}

function updateSubcategoryFailure(payload) {
    return {
        type: actionConstants.UPDATE_SUBCATEGORY_FAILURE,
        payload
    }
}

// Delete subcategory
function deleteSubcategoryRequest(payload) {
    return {
        type: actionConstants.DELETE_SUBCATEGORY_REQUEST,
        payload
    }
}

function deleteSubcategorySuccess(payload) {
    return {
        type: actionConstants.DELETE_SUBCATEGORY_SUCCESS,
        payload
    }
}

function deleteSubcategoryFailure(payload) {
    return {
        type: actionConstants.DELETE_SUBCATEGORY_FAILURE,
        payload
    }
}

