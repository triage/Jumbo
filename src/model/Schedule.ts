export class Schedule {
  address: string
  balance: number
  instructor: string
  price: object
  dates: object
  class: object
  constructor(public json: JSON) {
    Object.assign(this, {}, json)
  }
}

// schedules.push({
//   address,
//   balance,
//   instructor,
//   price,
//   dates: {
//     /* eslint-disable radix */
//     start: moment.unix(parseInt(dates[0].valueOf()) / 1000).toDate(),
//     end: moment.unix(parseInt(dates[1].valueOf()) / 1000).toDate(),
//     cancellation: moment.unix(parseInt(dates[2].valueOf()) / 1000).toDate(),
//     purchase: moment.unix(parseInt(dates[3].valueOf()) / 1000).toDate(),
//   },
//   class: classes.find(found => {
//     if (found.address === klass) {
//       return found
//     }
//     return undefined
//   }),