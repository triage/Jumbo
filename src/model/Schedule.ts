export class Schedule {
  address: string
  balance: number
  instructor: string
  price: object
  dates: object
  class: object
  reserved: boolean
  constructor(public json: JSON) {
    Object.assign(this, {}, json)
  }
}
