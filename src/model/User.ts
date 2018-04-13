import { eth } from 'util/eth'

interface UserJSON {
  type: string
  name: string
  contactDetails: string
  balance: string
}

export class User {
  type: string
  name: string
  contactDetails: string
  constructor(public json: UserJSON) {
    Object.assign(this, {}, json, {
      balance: json ? eth.web3().fromWei(json.balance) : null
    })
  }
}
