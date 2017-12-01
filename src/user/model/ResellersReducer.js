import { RESELLERS_LOADED } from './StudioActions'
import { RESELLER_ADDED, RESELLER_REMOVED } from '../ui/profile/ResellerActions'
import { addresses } from 'src/util/eth'

const initialState = []

const resellersReducer = (state = initialState, action) => {
  if (action.type === 'persist/REHYDRATE') {
    return action.payload.resellers || initialState
  } else if (action.type === RESELLERS_LOADED) {
    return action.resellers.filter(reseller => {
      return reseller.address !== addresses.blank
    })
  } else if (action.type === RESELLER_ADDED) {
    const resellers =  Array.from(state)
    const { address, name } = action
    resellers.push({ address, name })
    return resellers
  } else if (action.type === RESELLER_REMOVED) {
    const resellers = Array.from(state).filter(reseller => {
      return reseller.address !== action.address
    })
    return resellers
  }
  return state
}

export default resellersReducer
