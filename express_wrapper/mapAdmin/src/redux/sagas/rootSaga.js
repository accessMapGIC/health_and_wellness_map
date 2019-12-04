import { all } from "redux-saga/effects";
import { watchCreateService, watchGetService, watchEditService, watchDeleteService } from "../sagas/serviceSagas";
import { watchSignIn, watchGetAuth, watchSignOut } from "./authSagas"
import { watchCreatePrimaryCategory, watchGetPrimaryCategory, watchUpdatePrimaryCategory, watchDeletePrimaryCategory, watchCreateSubcategory, watchGetSubcategory, watchUpdateSubcategory, watchDeleteSubcategory } from './categorySagas';
import { watchCreateInsurance, watchGetInsurance, watchUpdateInsurance, watchDeleteInsurance } from "./insuranceSagas";
import { watchGetReportedError, watchDeleteReportedError } from "./feedbackSagas";

export default function* rootSaga() {
    yield all([
        watchCreateService(),
        watchGetService(),
        watchEditService(),
        watchDeleteService(),
        watchSignIn(),
        watchSignOut(),
        watchGetAuth(),

        watchCreatePrimaryCategory(),
        watchGetPrimaryCategory(),
        watchUpdatePrimaryCategory(), 
        watchDeletePrimaryCategory(), 
        watchCreateSubcategory(), 
        watchGetSubcategory(), 
        watchUpdateSubcategory(),
        watchDeleteSubcategory(),

        watchCreateInsurance(),
        watchGetInsurance(),
        watchUpdateInsurance(),
        watchDeleteInsurance(),

        watchGetReportedError(),
        watchDeleteReportedError()
    ]);
}