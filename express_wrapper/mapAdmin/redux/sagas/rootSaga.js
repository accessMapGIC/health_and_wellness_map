import { all } from "redux-saga/effects";
import { watchGetPrimaryCategory, watchGetSubcategory, watchGetInsurance, watchCreateService, watchGetService } from "../sagas/serviceSagas";
import { watchSignIn, watchGetAuth, watchSignOut } from "./authSagas"

export default function* rootSaga() {
    yield all([
        watchGetPrimaryCategory(),
        watchGetSubcategory(), 
        watchGetInsurance(),
        watchCreateService(),
        watchGetService(),
        watchSignIn(),
        watchGetAuth(),
        watchSignOut()
    ]);
}