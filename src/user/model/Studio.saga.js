import { put, takeEvery, take } from 'redux-saga/effects'
import { STUDIO_INFO_LOAD, STUDIO_INFO_LOADED, STUDIO_LOAD, RESELLERS_LOADED, RESELLERS_LOAD, resellersLoad, resellersLoaded, studioInfoLoad, studioInfoError, studioInfoLoaded } from './StudioActions'
import { classesLoad, CLASSES_LOADED } from './ClassesActions'
import { schedulesLoad, SCHEDULES_LOADED } from './ScheduleActions'
import eth from 'util/eth'

function* studioInfoSaga(action) {
  try {
    const { address } = action
    const studio = yield eth.Studio().deployed()
    const name = yield studio.name.call(address)
    const contactDetails = yield studio.contactDetails.call(address)
    yield put(studioInfoLoaded(name, contactDetails))
  } catch (error) {
    console.log(`error:${error}`)
    yield put(studioInfoError(error))
  }
}

function* studioLoadSaga(action) {
  try {
    // first load studio info
    yield put(studioInfoLoad(action.address))
    yield take(STUDIO_INFO_LOADED)

    // then load all classes
    yield put(classesLoad(action.address))
    yield take(CLASSES_LOADED)

    // load all schedules
    yield put(schedulesLoad(action.address))
    yield take(SCHEDULES_LOADED)

    yield put(resellersLoad(action.address))
    yield take(RESELLERS_LOADED)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

function* doResellersLoad(action) {
  try {
    const studio = yield eth.Studio().deployed()
    const reseller = yield eth.Reseller().deployed()
    const count = yield studio.resellersCount.call()
    const resellers = []
    for (let index = 0; index < count; index++) {
      const address = yield studio.resellerAtIndex.call(index);
      const name = yield reseller.getName.call(address)
      resellers.push({
        address,
        name
      });
    }
    yield put(resellersLoaded(resellers))
  } catch (error) {
    debugger
  }
}


export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
  yield takeEvery(STUDIO_LOAD, studioLoadSaga)
  yield takeEvery(RESELLERS_LOAD, doResellersLoad)
}
