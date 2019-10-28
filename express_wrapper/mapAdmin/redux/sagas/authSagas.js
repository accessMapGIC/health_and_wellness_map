import 'whatwg-fetch';
import { takeLatest, call, put } from "redux-saga/effects";
import  actionConstants from '../actionConstants';
import { authActions } from '../actions/authActions';
const base_url =  process.env.REACT_APP_BASE_URL || "http://gic.geog.mcgill.ca:5001";

// Sign in
export function* watchSignIn() {
    yield takeLatest(actionConstants.SIGN_IN_REQUEST, workerSignIn);
}

// Make signIn API request and check if email/password are correct
async function signIn(payload) {
    // const creds = window.btoa(payload.email + ":" + payload.password);
    try {
        let resp = await fetch(`${base_url}/signin`, {
            credentials: "same-origin",
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Basic ' + creds, This is for the cookie
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            }
        })
        let status = resp.status;
        let respBody = await resp.json();
        return {message: respBody, status: status};
    }
    catch (err) {
        return err;
    }
    
  
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=http://localhost:8081/newService";
}

// Make the api call when watcher saga sees the action
function* workerSignIn(params) {
    try {

        const response = yield call(signIn, params.payload);

        // dispatch a success action to the store 
        if (response.status == 200) {
            setCookie('token', response.message.token, 1/100); //Set the cookie expire time
            yield put(authActions.signInSuccess(response.message));
        }
        else {
            yield put(authActions.signInFailure(response.message));
        }
    } 
    catch (error) {
        // dispatch a failure action to the store with the error
        yield put(authActions.signInFailure(error));
    }
}

//Get authentication info
export function* watchGetAuth() {
        yield takeLatest(actionConstants.GET_AUTH_REQUEST, workerGetAuth);
}

async function getAuth(payload) {
    try {
        let resp1 = await fetch(`${base_url}/auth`, {
            credentials: "same-origin",
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            },
        });
        let resp1Body = await resp1.json();
        return resp1Body;
    }
    catch (err) {
        return err;
    }
}

// Make the api call when watcher saga sees the action
function* workerGetAuth(params) {
    try {
        //Get auth status and username
        const response = yield call(getAuth, params.payload);
        yield put(authActions.getAuthSuccess( response));
    } 
    catch (error) {
        // dispatch a failure action to the store with the error
        yield put(authActions.getAuthFailure(error));
    }
}


// Sign out
export function* watchSignOut() {
    yield takeLatest(actionConstants.SIGN_OUT_REQUEST, workerSignOut);
}

async function signOut() {
    try {
        let resp = await fetch('/api-admin/logout', {
            credentials: "same-origin",
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
            }
        });
        if (resp.status == 200) {
            window.location.href = '/login';
        }
        return resp;
    }
    catch (err) {
        return err;
    }
}

// Make the api call when watcher saga sees the action
function* workerSignOut() {
    const response = yield call(signOut);

    try {
        if (response.status == 200) {
            yield put(authActions.signOutSuccess(response.message));
        } else {
            yield put(authActions.signOutFailure(response.message.error));
        }
    } 
    catch (error) {
        yield put(authActions.signOutFailure(error));
    }
}

