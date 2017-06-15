import { put, call, takeEvery } from 'redux-saga/effects'
import ScheduleContract from 'contracts/Schedule.json'
import StudioContract from 'contracts/Studio.json'
import Web3 from 'web3'
import { schedulesLoaded, SCHEDULES_LOAD } from './ScheduleActions'
import moment from 'moment'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

function* schedulesLoadSaga(action) {
  const studio = Studio.at(action.studio)
  const schedulesCount = yield call(studio.schedulesCount.call)

  let schedules = []
  for (let i = 0; i < schedulesCount; i++) {
    const address = yield call(studio.scheduleAtIndex.call, i)
    const schedule = Schedule.at(address)
    const instructor = yield call(schedule.instructor.call)
    const dates = yield call(schedule.dates.call)
    const klass = yield call(schedule.class.call)
    //move this somewhere model-specific

    schedules.push({
      schedule,
      instructor,
      dates: {
        start: moment.unix(parseInt(dates[0].valueOf()) / 1000).toDate(),
        end: moment.unix(parseInt(dates[1].valueOf()) / 1000).toDate(),
        cancellation: moment.unix(parseInt(dates[2].valueOf()) / 1000).toDate(),
        purchase: moment.unix(parseInt(dates[3].valueOf()) / 1000).toDate(),
      },
      class: klass,
      instance: schedule,
    })
  }
  yield put(schedulesLoaded(schedules))
}

export function* watchSchedulesLoad() {
  yield takeEvery(SCHEDULES_LOAD, schedulesLoadSaga)
}
