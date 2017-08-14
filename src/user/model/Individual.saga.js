import { put, call, takeEvery, take } from 'redux-saga/effects'
import moment from 'moment'
import { INDIVIDUAL_LOAD } from './IndividualActions'
import { schedulesLoad, SCHEDULES_LOADED, schedulesLoaded } from './ScheduleActions'
import eth from 'src/util/eth'

function* doIndividualLoad(action) {
  const Individual = eth.Individual()
  const Class = eth.Class()
  const Schedule = eth.Schedule()
  const Studio = eth.Studio()
  try {
    const individual = Individual.at(action.individual)
    let count = yield individual.getSchedulesCount.call()
    const schedules = []
    for (let i = 0; i < parseInt(count.valueOf()); i++) {
      const address = yield individual.getSchedule.call(i)
      const schedule = Schedule.at(address)
      const dates = yield schedule.dates.call()
      const instructor = yield schedule.instructor.call()
      const classAddress = yield schedule.class.call()
      const klass = Class.at(classAddress)
      const name = yield klass.name.call()
      const studioAddress = yield klass.studio.call()
      const studio = Studio.at(studioAddress)
      const studioName = yield studio.name.call()
      const studioContactDetails = yield studio.contactDetails.call()

      schedules.push({
        address: schedule.address,
        instructor,
        dates: {
          /* eslint-disable radix */
          start: moment.unix(parseInt(dates[0].valueOf()) / 1000).toDate(),
          end: moment.unix(parseInt(dates[1].valueOf()) / 1000).toDate(),
          cancellation: moment.unix(parseInt(dates[2].valueOf()) / 1000).toDate(),
          purchase: moment.unix(parseInt(dates[3].valueOf()) / 1000).toDate(),
        },
        class: {
          address: classAddress,
          name
        },
        studio: {
          name: studioName,
          contactDetails: studioContactDetails
        }
      })
    }
    yield put(schedulesLoaded(schedules))

  } catch (error) {
    console.log(`error:${error}`)
    debugger
  }
}

export function* watchIndividualLoad() {
  yield takeEvery(INDIVIDUAL_LOAD, doIndividualLoad)
}
