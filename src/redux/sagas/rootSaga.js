import { all } from "redux-saga/effects";

// import {theoDoiActionGetTaskApi} from './ToDoListSaga'
import * as Cyberbugs from './Cyberbugs/UserCyberbugsSaga';
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import { ProjectCyberBugsReducer } from "../reducers/ProjectCyberBugsReducer";
export function* rootSaga() {

  yield all([
    //Nghiệp vụ cyberbugs .... ,
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.watchGetUser(),
    Cyberbugs.watchAddUserProject(),
    Cyberbugs.watchRemoveUserProject(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.watchUpdateProjectSaga(),
    ProjectSaga.watchDeleteProjectSaga(),
    ProjectSaga.watchProjectDetail()
  ])


}