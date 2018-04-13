import { put, takeEvery, take } from 'redux-saga/effects'
import { eth } from 'util/eth'
import { STUDIO_INFO_LOAD, STUDIO_INFO_LOADED, STUDIO_LOAD, RESELLERS_LOADED, RESELLERS_LOAD, resellersLoad, resellersLoaded, studioInfoLoad, studioInfoError, studioInfoLoaded } from './StudioActions'
import { classesLoad, CLASSES_LOADED } from './../classes/ClassesActions'
import { schedulesLoad, SCHEDULES_LOADED } from './../schedule/ScheduleActions'

function* studioInfoSaga(action) {
  try {
    const { address } = action
    const studio = yield eth.Studio().deployed()
    const name = yield studio.name.call(address)
    const contactDetails = yield studio.contactDetails.call(address)
    yield put(studioInfoLoaded(name, contactDetails))
  } catch (error) {
    /* eslint-disable no-console */
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
    /* eslint-disable no-console */
    console.log(`error:${error}`)
  }
}

function* doResellersLoad() {
  try {
    const studio = yield eth.Studio().deployed()
    const reseller = yield eth.Reseller().deployed()
    const count = yield studio.resellersCount.call()
    const resellers = []
    for (let index = 0; index < count; index += 1) {
      const address = yield studio.resellerAtIndex.call(index)
      const name = yield reseller.getName.call(address)
      resellers.push({
        address,
        name,
      })
    }
    yield put(resellersLoaded(resellers))
  } catch (error) {
    /* eslint-disable no-console */
    console.log(`error:${error}`)
  }
}

/* eslint-disable import/prefer-default-export */
export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
  yield takeEvery(STUDIO_LOAD, studioLoadSaga)
  yield takeEvery(RESELLERS_LOAD, doResellersLoad)
}
