import { takeLatest, call, put } from "redux-saga/effects";
import actionConstants from "../actionConstants";
import { categoryActions } from "../actions/categoryActions";
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

// Create primary cat
export function* watchCreatePrimaryCategory() {
    yield takeLatest(actionConstants.CREATE_PRIMARY_CATEGORY_REQUEST, workerCreatePrimaryCategory);
}
function* workerCreatePrimaryCategory(params) {
    try {
        const response = yield call(createPrimaryCategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.createPrimaryCategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(categoryActions.createPrimaryCategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.createPrimaryCategoryFailure(err));
    }
}
async function createPrimaryCategory(payload) {
    try {
        let resp = await fetch(`${base_url}/primary_category`, {
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

// Get primary cat
export function* watchGetPrimaryCategory() {
    yield takeLatest(actionConstants.GET_PRIMARY_CATEGORY_REQUEST, workerGetPrimaryCategory);
}
function* workerGetPrimaryCategory(params) {
    try {
        const response = yield call(getPrimaryCategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.getPrimaryCategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(categoryActions.getPrimaryCategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.getPrimaryCategoryFailure(err));
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

// Update primary cat
export function* watchUpdatePrimaryCategory() {
    yield takeLatest(actionConstants.UPDATE_PRIMARY_CATEGORY_REQUEST, workerUpdatePrimaryCategory);
}
function* workerUpdatePrimaryCategory(params) {
    try {
        const response = yield call(updatePrimaryCategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.updatePrimaryCategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(categoryActions.updatePrimaryCategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.updatePrimaryCategoryFailure(err));
    }
}
async function updatePrimaryCategory(payload) {
    try {
        let resp = await fetch(`${base_url}/primary_category/${payload.cat_id}`, {
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

// Delete primary cat
export function* watchDeletePrimaryCategory() {
    yield takeLatest(actionConstants.DELETE_PRIMARY_CATEGORY_REQUEST, workerDeletePrimaryCategory);
}
function* workerDeletePrimaryCategory(params) {
    try {
        const response = yield call(deletePrimaryCategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.deletePrimaryCategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") +"/";
        }
        else {
            yield put(categoryActions.deletePrimaryCategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.deletePrimaryCategoryFailure(err));
    }
}
async function deletePrimaryCategory(payload) {
    try {
        let resp = await fetch(`${base_url}/primary_category/${payload}`, {
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

// Create subcat
export function* watchCreateSubcategory() {
    yield takeLatest(actionConstants.CREATE_SUBCATEGORY_REQUEST, workerCreateSubcategory);
}
function* workerCreateSubcategory(params) {
    try {
        const response = yield call(createSubcategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.createSubcategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") +"/";
        }
        else {
            yield put(categoryActions.createSubcategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.createSubcategoryFailure(err));
    }
}
async function createSubcategory(payload) {
    try {
        let resp = await fetch(`${base_url}/subcategory`, {
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
export function* watchGetSubcategory() {
    yield takeLatest(actionConstants.GET_SUBCATEGORY_REQUEST, workerGetSubcategory);
}
function* workerGetSubcategory(params) {
    try {
        const response = yield call(getSubcategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.getSubcategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") +"/";
        }
        else {
            yield put(categoryActions.getSubcategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.getSubcategoryFailure(err));
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

// Update subcat
export function* watchUpdateSubcategory() {
    yield takeLatest(actionConstants.UPDATE_SUBCATEGORY_REQUEST, workerUpdateSubcategory);
}
function* workerUpdateSubcategory(params) {
    try {
        const response = yield call(updateSubcategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.updateSubcategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") +"/";
        }
        else {
            yield put(categoryActions.updateSubcategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.updateSubcategoryFailure(err));
    }
}
async function updateSubcategory(payload) {
    try {
        let resp = await fetch(`${base_url}/subcategory/${payload.subcat_id}`, {
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
export function* watchDeleteSubcategory() {
    yield takeLatest(actionConstants.DELETE_SUBCATEGORY_REQUEST, workerDeleteSubcategory);
}
function* workerDeleteSubcategory(params) {
    try {
        const response = yield call(deleteSubcategory, params.payload);
        if (response.status === 200) {
            yield put(categoryActions.deleteSubcategorySuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href=(process.env.REACT_APP_BASE_NAME || "") +"/";
        }
        else {
            yield put(categoryActions.deleteSubcategoryFailure(response.message));
        }
    }
    catch(err) {
        yield put(categoryActions.deleteSubcategoryFailure(err));
    }
}
async function deleteSubcategory(payload) {
    try {
        let resp = await fetch(`${base_url}/subcategory/${payload}`, {
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
