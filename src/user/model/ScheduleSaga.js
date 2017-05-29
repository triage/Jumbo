import { put, call, takeEvery } from 'redux-saga/effects'
import ScheduleContract from 'contracts/Schedule.json'
import StudioContract from 'contracts/Studio.json'
import Web3 from 'web3'
import { schedulesLoaded, SCHEDULES_LOAD } from './ScheduleActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

const Studio = contract(StudioContract)

function* schedulesLoadSaga(action) {
  debugger
  const studio = Studio.at(action.studio)
  const schedulesCount = yield call(studio.schedulesCount.call)
  console.log(`schedules count:${schedulesCount}`)

  let schedules = []
  for (let i = 0; i < schedulesCount; i++) {
    const address = yield call(studio.scheduleAtIndex.call, i)
    // console.log(`schedule:${schedule}`)
    const schedule = Schedule.at(address)
    const instructor = yield call(schedule.instructor.call)
    const dates = yield call(schedule.dates.call)
    const klass = yield call(schedule.class.call)
    schedules.push({
      schedule,
      instructor,
      dates,
      class: klass,
      instance: schedule,
    })
  }
  debugger
  yield put(schedulesLoaded(schedules))
}

export function* watchSchedulesLoad() {
  yield takeEvery(SCHEDULES_LOAD, schedulesLoadSaga)
}
