import actionConstants from "../actionConstants";
export const authActions = {
    signInRequest, signInSuccess, signInFailure,
    getAuthRequest, getAuthSuccess, getAuthFailure,
    signOutRequest, signOutSuccess, signOutFailure,
};


//Sign in
function signInRequest(payload) {
    return { 
        type: actionConstants.SIGN_IN_REQUEST, 
        payload
    } 
}
function signInSuccess(payload) {
    return { 
        type: actionConstants.SIGN_IN_SUCCESS, 
        payload
    } 
}
function signInFailure(error) {
    return { 
        type: actionConstants.SIGN_IN_FAILURE, 
        error
    } 
}
    
//Get auth
function getAuthRequest() {
    return { 
        type: actionConstants.GET_AUTH_REQUEST, 
    }
}
function getAuthSuccess(payload) {
    return { 
        type: actionConstants.GET_AUTH_SUCCESS,
        payload,
    } 
}
function getAuthFailure(error) {
    return { 
        type: actionConstants.GET_AUTH_FAILURE, 
        error
    } 
}

//Sign out
function signOutRequest() {
    return {
        type: actionConstants.SIGN_OUT_REQUEST
    }
}
function signOutSuccess() {
    return { 
        type: actionConstants.SIGN_OUT_SUCCESS
    } 
}
function signOutFailure(error) {
    return { 
        type: actionConstants.SIGN_OUT_FAILURE,
        error
    } 
}

