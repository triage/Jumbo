import { put, call, takeEvery, select } from 'redux-saga/effects'
import moment from 'moment'
import eth from 'src/util/eth'
import UserType from 'src/user/model/UserType'
import { schedulesLoaded, SCHEDULES_LOAD } from './ScheduleActions'

function* schedulesLoadSaga(action) {
  const studio = eth.Studio().at(action.studio)
  const schedulesCount = yield call(studio.schedulesCount.call)

  const classes = yield select(state => state.studio.classes);
  let schedules = []

  for (let i = 0; i < schedulesCount; i++) {
    const address = yield call(studio.scheduleAtIndex.call, i)
    const schedule = eth.Schedule().at(address)
    const instructor = yield call(schedule.instructor.call)
    const dates = yield call(schedule.dates.call)
    const klass = yield call(schedule.class.call)
    // const balance = yield call(eth.getBalance, address)
    const price = {}
    price.individual = yield call(schedule.getPriceWithUserType.call, UserType.individual)
    price.reseller = yield call(schedule.getPriceWithUserType.call, UserType.reseller)
    schedules.push({
      address,
      balance: { reseller: 1, individual: 1},
      // balance,
      schedule,
      instructor,
      price,
      dates: {
        /* eslint-disable radix */
        start: moment.unix(parseInt(dates[0].valueOf()) / 1000).toDate(),
        end: moment.unix(parseInt(dates[1].valueOf()) / 1000).toDate(),
        cancellation: moment.unix(parseInt(dates[2].valueOf()) / 1000).toDate(),
        purchase: moment.unix(parseInt(dates[3].valueOf()) / 1000).toDate(),
      },
      class: classes.find(found => {
        if (found.address === klass) {
          return found;
        }
        return undefined;
      }),
      instance: schedule,
    })
  }
  yield put(schedulesLoaded(schedules))
  debugger
}

export function* watchSchedulesLoad() {
  yield takeEvery(SCHEDULES_LOAD, schedulesLoadSaga)
}
