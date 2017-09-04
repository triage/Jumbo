import { put, call, takeEvery, select } from 'redux-saga/effects'
import moment from 'moment'
import eth from 'src/util/eth'
import UserType from 'src/user/model/UserType'
import { schedulesLoaded, scheduleLoaded, SCHEDULES_LOAD, SCHEDULE_LOAD } from './ScheduleActions'

function* doSchedulesLoad(action) {
  try {
    const studio = yield eth.Studio().deployed()
    const schedulesCount = yield studio.schedulesCount.call(eth.from())
    const classes = yield select(state => state.studio.classes);
    let schedules = []

    // todo: don't totally wipe out the schedules here ... only replace if necessary so as to prevent a refresh
    for (let i = 0; i < parseInt(schedulesCount.valueOf(10)); i++) {
      const address = yield studio.scheduleAtIndex.call(i, eth.from())
      const schedule = eth.Schedule().at(address)
      const instructor = yield schedule.instructor.call()
      const dates = yield schedule.dates.call()
      const klass = yield schedule.klass.call()
      const balance = yield eth.getBalance(address)
      const price = {}
      price.individual = yield schedule.getPriceWithUserType(UserType.individual)
      price.reseller = yield schedule.getPriceWithUserType(UserType.reseller)
      schedules.push({
        address,
        balance,
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
      })
    }
    yield put(schedulesLoaded(schedules))
  } catch (error) {
    debugger
    console.log(`error:${error}`)
  }
}

function* doScheduleLoad(action) {
  try {
    const individual = eth.Individual().deployed()
    const user = yield select(state => state.user.data)
    const address = action.address
    const schedule = eth.Schedule().at(address)
    const instructor = yield call(schedule.instructor.call)
    const dates = yield call(schedule.dates.call)
    const klass = yield call(schedule.klass.call)
    const balance = yield call(eth.getBalance, action.address)
    const price = {}
    price.individual = yield call(schedule.getPriceWithUserType.call, UserType.individual)
    price.reseller = yield schedule.getPriceWithUserType.call(UserType.reseller)
    const reserved = yield schedule.spotIsReserved.call(user.address)
    let nSpots = yield schedule.nSpots.call()
    nSpots = nSpots.valueOf()
    const attendees = []
    for (let i = 0; i < nSpots; i++) {
      const address = yield schedule.getSpotAtIndex.call(i)
      if (parseInt(address) === 0) {
        continue
      }
      const name = yield individual.getName.call(address)
      attendees.push({
        address,
        name
      })
    }
    const classInstance = eth.Class().at(klass)
    const name = yield call(classInstance.name.call)
    const description = yield call(classInstance.description.call)
    const classObject = {
      address: klass,
      name,
      description,
    }

    const scheduleObj = {
      address,
      attendees,
      balance,
      instructor,
      price,
      reserved,
      nSpots,
      dates: {
        /* eslint-disable radix */
        start: moment.unix(parseInt(dates[0].valueOf(10)) / 1000).toDate(),
        end: moment.unix(parseInt(dates[1].valueOf(10)) / 1000).toDate(),
        cancellation: moment.unix(parseInt(dates[2].valueOf(10)) / 1000).toDate(),
        purchase: moment.unix(parseInt(dates[3].valueOf(10)) / 1000).toDate(),
      },
      class: classObject
    }
    yield put(scheduleLoaded(scheduleObj))
  } catch (error) {
    console.log(`error:${error}`)
  }
}

export function* watchSchedulesLoad() {
  yield takeEvery(SCHEDULE_LOAD, doScheduleLoad)
  yield takeEvery(SCHEDULES_LOAD, doSchedulesLoad)
}
