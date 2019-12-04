import { takeLatest, call, put } from "redux-saga/effects";
import actionConstants from "../actionConstants";
import { feedbackActions } from "../actions/feedbackActions";
import { stat } from "fs";
const base_url =  process.env.REACT_APP_BASE_URL || "http://gic.geog.mcgill.ca:5001";

function getCookie() {
            var nameEQ = "token" + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0){
                    return c.substring(nameEQ.length,c.length);
                } 
            }
            return null;
}

// Get reported error
export function* watchGetReportedError() {
    yield takeLatest(actionConstants.GET_REPORTED_ERROR_REQUEST, workerGetReportedError);
}
function* workerGetReportedError(params) {
    try {
        const response = yield call(getReportedError, params.payload);
        if (response.status === 200) {
            yield put(feedbackActions.getReportedErrorSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(feedbackActions.getReportedErrorFailure(response.message));
        }
    }
    catch(err) {
        yield put(feedbackActions.getReportedErrorFailure(err));
    }
}
async function getReportedError(payload) {
    try {
        let resp = await fetch(`${base_url}/reportedError`, {
            credentials: "same-origin",
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Authorization': `${getCookie()}`
            }
        });
        let status = resp.status;
        let respBody = await resp.json()
        return {message: respBody, status: status};
    }
    catch(err) {
        return err;
    }
}

// Delete reported error
export function* watchDeleteReportedError() {
    yield takeLatest(actionConstants.DELETE_REPORTED_ERROR_REQUEST, workerDeleteReportedError);
}
function* workerDeleteReportedError(params) {
    try {
        const response = yield call(deleteReportedError, params.payload);
        if (response.status === 200) {
            yield put(feedbackActions.deleteReportedErrorSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(feedbackActions.deleteReportedErrorFailure(response.message));
        }
    }
    catch(err) {
        yield put(feedbackActions.deleteReportedErrorFailure(err));
    }
}
async function deleteReportedError(payload) {
    try {
        let resp = await fetch(`${base_url}/reportedError/${payload.Id}`, {
            credentials: "same-origin",
            method: "delete",
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Authorization': `${getCookie()}`
            }
        });
        let status = resp.status;
        let respBody = await resp.json()
        return {message: respBody, status: status};
    }
    catch(err) {
        return err;
    }
}