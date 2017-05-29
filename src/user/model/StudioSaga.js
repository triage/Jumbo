import { put, call, take, takeEvery } from 'redux-saga/effects'
import StudioContract from 'contracts/Studio.json'
import Web3 from 'web3'
import { STUDIO_INFO_LOAD, STUDIO_INFO_LOADED, STUDIO_LOAD, studioInfoLoad, studioInfoError, studioInfoLoaded } from './StudioActions'
import { classesLoad, CLASSES_LOADED } from './ClassesActions'
import { schedulesLoad, SCHEDULES_LOADED } from './ScheduleActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Studio = contract(StudioContract)
Studio.setProvider(provider)

function* studioInfoSaga(action) {
  try {
    debugger
    const studioInstance = Studio.at(action.studio)
    const name = yield call(studioInstance.name.call)
    const contactDetails = yield call(studioInstance.contactDetails.call)
    debugger
    yield put(studioInfoLoaded(name, contactDetails))
  } catch (error) {
    console.log(`error:${error}`)
    yield put(studioInfoError(error))
  }
}

function* studioLoadSaga(action) {
  try {
    debugger
    const studioInstance = Studio.at(action.studio)

    //first load studio info
    yield put(studioInfoLoad(action.studio))
    yield take(STUDIO_INFO_LOADED)

    //then load all classes
    debugger
    yield put(classesLoad(action.studio))
    yield take(CLASSES_LOADED)

    debugger
    //load all schedules
    yield put(schedulesLoad(action.studio))
    yield take(SCHEDULES_LOADED)
    debugger

  } catch (error) {
    console.log(`error:${error}`)
  }
}

export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
  yield takeEvery(STUDIO_LOAD, studioLoadSaga)
}
