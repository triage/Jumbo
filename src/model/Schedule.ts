import moment from 'moment'

const format = {
  long: 'ddd, MMM D, H:mm a',
  short: 'H:mm a',
  date: 'ddd, MMM D',
}

interface ScheduleJSON {
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
  address: string
  balance: number
  instructor: string
  price: object
  dates: {
    date: string
    start: string
    end: string
    cancellation: string
    purchase: string
  }
  class: {
    name: string
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
        date: json ? moment(json.dates.start).format(format.date) : null,
        start: json ? moment(json.dates.start).format(format.short) : null,
        end: json ? moment(json.dates.end).format(format.short) : null,
      }
    })
  }
}
