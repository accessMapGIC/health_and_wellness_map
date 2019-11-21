import { takeLatest, call, put } from "redux-saga/effects";
import actionConstants from "../actionConstants";
import { insuranceActions } from "../actions/insuranceActions";
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

// Create subcat
export function* watchCreateInsurance() {
    yield takeLatest(actionConstants.CREATE_INSURANCE_REQUEST, workerCreateInsurance);
}
function* workerCreateInsurance(params) {
    try {
        const response = yield call(createInsurance, params.payload);
        if (response.status === 200) {
            yield put(insuranceActions.createInsuranceSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") +"/";
        }
        else {
            yield put(insuranceActions.createInsuranceFailure(response.message));
        }
    }
    catch(err) {
        yield put(insuranceActions.createInsuranceFailure(err));
    }
}
async function createInsurance(payload) {
    try {
        let resp = await fetch(`${base_url}/insurance`, {
            credentials: "same-origin",
            method: "post",
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

// Get subcat
export function* watchGetInsurance() {
    yield takeLatest(actionConstants.GET_INSURANCE_REQUEST, workerGetInsurance);
}
function* workerGetInsurance(params) {
    try {
        const response = yield call(getInsurance, params.payload);
        if (response.status === 200) {
            yield put(insuranceActions.getInsuranceSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(insuranceActions.getInsuranceFailure(response.message));
        }
    }
    catch(err) {
        yield put(insuranceActions.getInsuranceFailure(err));
    }
}
async function getInsurance(payload) {
    try {
        let resp = await fetch(`${base_url}/insurance`, {
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

// Update subcat
export function* watchUpdateInsurance() {
    yield takeLatest(actionConstants.UPDATE_INSURANCE_REQUEST, workerUpdateInsurance);
}
function* workerUpdateInsurance(params) {
    try {
        const response = yield call(updateInsurance, params.payload);
        if (response.status === 200) {
            yield put(insuranceActions.updateInsuranceSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(insuranceActions.updateInsuranceFailure(response.message));
        }
    }
    catch(err) {
        yield put(insuranceActions.updateInsuranceFailure(err));
    }
}
async function updateInsurance(payload) {
    try {
        let resp = await fetch(`${base_url}/insurance/${payload.subcat_id}`, {
            credentials: "same-origin",
            method: "put",
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

// Delete subcat
export function* watchDeleteInsurance() {
    yield takeLatest(actionConstants.DELETE_INSURANCE_REQUEST, workerDeleteInsurance);
}
function* workerDeleteInsurance(params) {
    try {
        const response = yield call(deleteInsurance, params.payload);
        if (response.status === 200) {
            yield put(insuranceActions.deleteInsuranceSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(insuranceActions.deleteInsuranceFailure(response.message));
        }
    }
    catch(err) {
        yield put(insuranceActions.deleteInsuranceFailure(err));
    }
}
async function deleteInsurance(payload) {
    try {
        let resp = await fetch(`${base_url}/insurance/${payload}`, {
            credentials: "same-origin",
            method: "delete",
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