import { takeLatest, call, put } from "redux-saga/effects";
import actionConstants from "../actionConstants";
import { serviceActions } from "../actions/serviceActions";
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

// Get primary cat
export function* watchGetPrimaryCategory() {
    yield takeLatest(actionConstants.GET_PRIMARY_CATEGORY_REQUEST, workerGetPrimaryCategory);
}
function* workerGetPrimaryCategory(params) {
    try {
        const response = yield call(getPrimaryCategory, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.getPrimaryCategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(serviceActions.getPrimaryCategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.getPrimaryCategoryFailure(err));
    }
}
async function getPrimaryCategory(payload) {
    try {
        let resp = await fetch(`${base_url}/primary_category`, {
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

// Get subcat
export function* watchGetSubcategory() {
    yield takeLatest(actionConstants.GET_SUBCATEGORY_REQUEST, workerGetSubcategory);
}
function* workerGetSubcategory(params) {
    try {
        const response = yield call(getSubcategory, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.getSubcategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(serviceActions.getSubcategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.getSubcategoryFailure(err));
    }
}
async function getSubcategory(payload) {
    try {
        let resp = await fetch(`${base_url}/subcategory`, {
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
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
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
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
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
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
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

// Edit service
export function* watchEditService() {
    yield takeLatest(actionConstants.EDIT_SERVICE_REQUEST, workerEditService);
}
function* workerEditService(params) {
    try {
        const response = yield call(editService, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.editServiceSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(serviceActions.editServiceFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.editServiceFailure(err));
    }
}
async function editService(payload) {
    try {
        let resp = await fetch(`${base_url}/service/${payload.serviceId}`, {
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

// Delete service
export function* watchDeleteService() {
    yield takeLatest(actionConstants.DELETE_SERVICE_REQUEST, workerDeleteService);
}
function* workerDeleteService(params) {
    try {
        const response = yield call(deleteService, params.payload);
        if (response.status === 200) {
            yield put(serviceActions.deleteServiceSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(serviceActions.deleteServiceFailure(response.message));
        }
    }
    catch(err) {
        yield put(serviceActions.deleteServiceFailure(err));
    }
}
async function deleteService(payload) {
    try {
        let resp = await fetch(`${base_url}/service/${payload.serviceId}`, {
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