import { takeLatest, call, put } from "redux-saga/effects";
import actionConstants from "../actionConstants";
import { searchTermActions } from "../actions/searchTermActions";

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

// Get Search Term 
export function* watchGetSearchTerm() {
    yield takeLatest(actionConstants.GET_SEARCH_TERM_REQUEST, workerGetSearchTerm);
}
function* workerGetSearchTerm(params) {
    try {
        const response = yield call(getSearchTerm, params.payload);
        if (response.status === 200) {
            yield put(searchTermActions.getSearchTermSuccess(response.message));
        }
        else if (response.status === 401) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + "/";
        }
        else {
            yield put(searchTermActions.getSearchTermFailure(response.message));
        }
    }
    catch(err) {
        yield put(searchTermActions.getSearchTermFailure(err));
    }
}
async function getSearchTerm(payload) {
    try {
        let resp = await fetch(`${base_url}/searchTerm`, {
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
        let respBody = await resp.json();
        return {message: respBody, status: status};
    }
    catch(err) {
        return err;
    }
}