import { put, call, takeEvery } from 'redux-saga/effects'
import StudioContract from 'contracts/Studio.json'
import Web3 from 'web3'
import { STUDIO_INFO_LOAD, studioInfoError, studioInfoLoaded } from './StudioActions'
import { scheduleLoadDetails } from './ScheduleActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Studio = contract(StudioContract)
Studio.setProvider(provider)

function* studioInfoSaga(action) {
  try {
    console.log(`got STUDIO_INFO_LOAD:${action.studio}`)
    const studioInstance = Studio.at(action.studio)

    //todo: load all classes
    
    // const name = yield call(studioInstance.name.call)
    // const contactDetails = yield call(studioInstance.contactDetails.call)
    
    //load all schedules
    const schedulesCount = yield call(studioInstance.schedulesCount.call)
    console.log(`schedules count:${schedulesCount}`)
    for(let i = 0; i < schedulesCount;  i++) {
      const schedule = yield call(studioInstance.scheduleAtIndex.call, i)
      console.log(`schedule:${schedule}`)
      yield put(scheduleLoadDetails(schedule))
    }
  } catch (error) {
    console.log(`error:${error}`)
    yield put(studioInfoError(error))
  }
}

export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
}
