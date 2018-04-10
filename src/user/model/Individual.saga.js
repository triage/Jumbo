import { put, takeEvery, call } from 'redux-saga/effects';
import moment from 'moment';
import UserType from 'user/model/UserType';
import eth from 'util/eth';
import { INDIVIDUAL_LOAD, individualLoaded } from './IndividualActions';

function* doIndividualLoad(action) {
  const Individual = eth.Individual();
  const Class = eth.Class();
  const Schedule = eth.Schedule();
  const Studio = eth.Studio();
  const from = eth.from();
  try {
    const individual = yield Individual.deployed();
    const count = yield individual.getSchedulesCount.call(from);
    const schedules = [];
    for (let i = 0; i < parseInt(count.valueOf(10), 10); i++) {
      const address = yield individual.getSchedule.call(i, from);
      const schedule = Schedule.at(address);
      const dates = yield schedule.dates.call();
      const instructor = yield schedule.instructor.call();
      const classAddress = yield schedule.klass.call();
      const klass = Class.at(classAddress);
      const name = yield klass.name.call();
      const description = yield klass.description.call();
      const studioAddress = yield klass.owner.call();
      const studio = yield Studio.deployed();
      const studioName = yield studio.name.call(studioAddress);
      const studioContactDetails = yield studio.contactDetails.call(studioAddress);
      const price = {};
      price.individual = yield call(schedule.getPriceWithUserType.call, UserType.individual);

      schedules.push({
        address: schedule.address,
        instructor,
        price,
        dates: {
          /* eslint-disable radix */
          start: moment.unix(parseInt(dates[0].valueOf(10)) / 1000).toDate(),
          end: moment.unix(parseInt(dates[1].valueOf(10)) / 1000).toDate(),
          cancellation: moment.unix(parseInt(dates[2].valueOf(10)) / 1000).toDate(),
          purchase: moment.unix(parseInt(dates[3].valueOf(10)) / 1000).toDate(),
        },
        class: {
          address: classAddress,
          name,
          description,
        },
        reserved: true,
        studio: {
          name: studioName,
          contactDetails: studioContactDetails,
        },
      });
    }
    yield put(individualLoaded(schedules));
  } catch (error) {
    console.log(`error:${error}`);
  }
}

export function* watchIndividualLoad() {
  yield takeEvery(INDIVIDUAL_LOAD, doIndividualLoad);
}
