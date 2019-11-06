import { all } from "redux-saga/effects";
import { watchGetInsurance, watchCreateService, watchGetService, watchEditService } from "../sagas/serviceSagas";
import { watchSignIn, watchGetAuth, watchSignOut } from "./authSagas"
import { watchCreatePrimaryCategory, watchGetPrimaryCategory, watchUpdatePrimaryCategory, watchDeletePrimaryCategory, watchCreateSubcategory, watchGetSubcategory, watchUpdateSubcategory, watchDeleteSubcategory } from './categorySagas';

export default function* rootSaga() {
    yield all([
        watchGetInsurance(),
        watchCreateService(),
        watchGetService(),
        watchEditService(),
        watchSignIn(),
        watchGetAuth(),
        watchSignOut(),

        watchCreatePrimaryCategory(),
        watchGetPrimaryCategory(),
        watchUpdatePrimaryCategory(), 
        watchDeletePrimaryCategory(), 
        watchCreateSubcategory(), 
        watchGetSubcategory(), 
        watchUpdateSubcategory(),
        watchDeleteSubcategory()
    ]);
}