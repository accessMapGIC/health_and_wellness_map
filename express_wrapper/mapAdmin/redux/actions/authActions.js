export const authActions = {
    signInRequest, signInSuccess, signInFailure,
    signOutRequest, signOutSuccess, signOutFailure,
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

