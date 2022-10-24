import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {history} from '../../../util/history';
import { CLOSE_DRAWER } from "../../constants/Cyberbugs/Cyberbugs";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
function* createProjectSaga(action) {

    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            history.push('/projectmanagement');
        }


    } catch (err) {
        console.log(err);
    }
   
    yield put({
        type: HIDE_LOADING
    })
}





export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}




//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy

function *getListProjectSaga(action) { 
    
    try {
        const {data,status} = yield call( () => cyberbugsService.getListProject());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_LIST_PROJECT',
                projectList:data.content
            })
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

// ****************************************************************

function *updateProjectSaga(action) { 
    console.log(action)

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
        const {data,status} = yield call( () => cyberbugsService.updateProject(action.projectUpdate));
        console.log("status",status)
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }
        yield put({
            type:'GET_LIST_PROJECT_SAGA'
        })
        yield put({
            type:CLOSE_DRAWER
        })
    }catch(err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* watchUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}
// ****************************************************************


function *deleteProjectSaga(action) { 
    console.log(action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success','Delete project successfully !')

            // history.push('/projectmanagement');
        }else {
            notifiFunction('error','Delete project fail !')
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getListProjectSaga);
        yield put({
            type:'CLOSE_DRAWER'
        })
    } catch (err) {
        notifiFunction('error','Delete project fail !')
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* watchDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}