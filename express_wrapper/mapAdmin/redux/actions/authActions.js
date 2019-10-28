export const authActions = {
    signInRequest, signInSuccess, signInFailure,
    signOutRequest, signOutSuccess, signOutFailure,
    getAuthRequest, getAuthSuccess, getAuthFailure,
};
import actionConstants from "../actionConstants";

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
function getAuthRequest(payload) {
    return { 
        type: actionConstants.GET_AUTH_REQUEST, 
        payload,
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

