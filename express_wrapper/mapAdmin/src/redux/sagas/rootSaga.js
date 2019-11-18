import { all } from "redux-saga/effects";
import { watchCreateService, watchGetService, watchEditService } from "../sagas/serviceSagas";
import { watchSignIn, watchGetAuth, watchSignOut } from "./authSagas"
import { watchCreatePrimaryCategory, watchGetPrimaryCategory, watchUpdatePrimaryCategory, watchDeletePrimaryCategory, watchCreateSubcategory, watchGetSubcategory, watchUpdateSubcategory, watchDeleteSubcategory } from './categorySagas';
import { watchCreateInsurance, watchGetInsurance, watchUpdateInsurance, watchDeleteInsurance } from "./insuranceSagas";

export default function* rootSaga() {
    yield all([
        watchCreateService(),
        watchGetService(),
        watchEditService(),
        watchSignIn(),
        watchSignOut(),

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
        watchDeleteInsurance()
    ]);
}