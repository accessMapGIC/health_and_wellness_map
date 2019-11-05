import { takeLatest, call, put } from "redux-saga/effects";
import actionConstants from "../actionConstants";
import { serviceActions } from "../actions/serviceActions";
const base_url =  process.env.REACT_APP_BASE_URL || "http://gic.geog.mcgill.ca:5001";

// Get insurance
export function* watchGetInsurance() {
    yield takeLatest(actionConstants.GET_INSURANCE_REQUEST, workerGetInsurance);
}
function* workerGetInsurance(params) {
    try {
        const response = yield call(getInsurance, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.getInsuranceSuccess(response.message));
        }
        else {
            yield put(serviceActions.getInsuranceFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.getInsuranceFailure(err));
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
                'Cache-Control': 'no-cache'
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

// Create service
export function* watchCreateService() {
    yield takeLatest(actionConstants.CREATE_SERVICE_REQUEST, workerCreateService);
}
function* workerCreateService(params) {
    try {
        const response = yield call(createService, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.createServiceSuccess(response.message));
        }
        else {
            yield put(serviceActions.createServiceFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.createServiceFailure(err));
    }
}
async function createService(payload) {
    try {
        let resp = await fetch(`${base_url}/service`, {
            credentials: "same-origin",
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
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

// Get service
export function* watchGetService() {
    yield takeLatest(actionConstants.GET_SERVICE_REQUEST, workerGetService);
}
function* workerGetService(params) {
    try {
        const response = yield call(getService, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.getServiceSuccess(response.message));
        }
        else {
            yield put(serviceActions.getServiceFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.getServiceFailure(err));
    }
}
async function getService(payload) {
    try {
        let resp = await fetch(`${base_url}/services`, {
            credentials: "same-origin",
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
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