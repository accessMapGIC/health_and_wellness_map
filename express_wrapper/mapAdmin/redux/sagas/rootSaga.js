import { all } from "redux-saga/effects";
import { watchGetPrimaryCategory, watchGetSubcategory, watchGetInsurance, watchCreateService } from "../sagas/serviceSagas";

export default function* rootSaga() {
    yield all([
        watchGetPrimaryCategory(),
        watchGetSubcategory(), 
        watchGetInsurance(),
        watchCreateService(),
    ]);
}