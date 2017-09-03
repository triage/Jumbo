import { put, call, takeEvery, take } from 'redux-saga/effects'
import { STUDIO_INFO_LOAD, STUDIO_INFO_LOADED, STUDIO_LOAD, studioInfoLoad, studioInfoError, studioInfoLoaded } from './StudioActions'
import { classesLoad, CLASSES_LOADED } from './ClassesActions'
import { schedulesLoad, SCHEDULES_LOADED } from './ScheduleActions'
import eth from 'src/util/eth'

function* studioInfoSaga(action) {
  try {
    const studio = yield Studio().deployed()
    const name = yield studio.name.call(eth.defaultAccount)
    // const contactDetails = yield call(studio.contactDetails.call)
    yield put(studioInfoLoaded(name, null))
  } catch (error) {
    console.log(`error:${error}`)
    yield put(studioInfoError(error))
  }
}

function* studioLoadSaga(action) {
  try {
    //first load studio info
    yield put(studioInfoLoad())
    yield take(STUDIO_INFO_LOADED)

    //then load all classes
    yield put(classesLoad())
    yield take(CLASSES_LOADED)

    //load all schedules
    yield put(schedulesLoad())
    yield take(SCHEDULES_LOADED)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
  yield takeEvery(STUDIO_LOAD, studioLoadSaga)
}
