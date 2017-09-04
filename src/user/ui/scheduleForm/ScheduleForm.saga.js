import { SCHEDULE_SUBMIT, scheduleCreateError } from './ScheduleFormActions'
import { put, apply, select, call, takeEvery } from 'redux-saga/effects'
import { schedulesLoad } from 'user/model/ScheduleActions'
import eth from 'src/util/eth'

function* doScheduleSubmit(action) {

  const Schedule = eth.Schedule()
  const Studio = eth.Studio()
  const from = eth.from()

  try {
    // const estimateScheduleNew = web3.eth.estimateGas({ data: Schedule.new })
    const values = action.values;
    const studio = yield Studio.deployed()
    debugger
    const schedule = yield apply(
      Schedule,
      Schedule.new,
      [
        studio.address,
        values.class.address,
        values.instructor,
        new Date(values.date.start).valueOf(),
        new Date(values.date.end).valueOf(),
        values.spots.total,
        values.spots.reseller,
        eth.web3().toWei(values.price.individual),
        eth.web3().toWei(values.price.reseller),
        from
      ]
    )
    debugger
    const user = yield select(state => state.user.data)
    
    debugger
    // const estimateScheduleAdded = web3.eth.estimateGas({ data: Schedule.scheduleAdded })
    yield apply(studio, studio.scheduleAdded, [schedule.address, from])
    debugger
    yield put(schedulesLoad(user.address))
    debugger
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    console.log(`error:${error}`)
    yield put (scheduleCreateError(error))
  }
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, doScheduleSubmit)
}