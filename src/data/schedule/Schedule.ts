import moment from 'moment'

export interface ScheduleJSON {
  address: string
  balance: number
  instructor: string
  price: object
  dates: {
    start: string
    end: string
    cancellation: string
    purchase: string
  }
  class: object
  reserved: boolean
  studio: {
    contactDetails: string
    name: string
    address: string
  }
}

interface StudioJSON {
  contactDetails: string
  name: string
  address: string
}

export class Studio {
  contactDetails: string
  name: string
  address: string
  constructor(public json: StudioJSON) {
    Object.assign(this, {}, json)
  }
}

export class Schedule {
  attendees?: [{
    name: string
  }]
  address: string
  balance: number
  instructor: string
  price: {
    individual: number,
    reseller: number,
  }
  dates: {
    date: moment.Moment
    start: moment.Moment
    end: moment.Moment
    cancellation: moment.Moment
    purchase: moment.Moment
  }
  class: {
    name: string
    description: string
  }
  reserved: boolean
  studio: {
    contactDetails: string
    name: string
    address: string
  }
  constructor(public json: ScheduleJSON) {
    Object.assign(this, {}, json, {
      dates: {
        cancellation: json ? moment(json.dates.cancellation) : null,
        purchase: json ? moment(json.dates.purchase) : null,
        date: json ? moment(json.dates.start) : null,
        start: json ? moment(json.dates.start) : null,
        end: json ? moment(json.dates.end) : null,
      }
    })
  }
}
