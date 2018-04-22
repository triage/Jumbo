import { addresses } from 'util/eth'
import { RESELLERS_LOADED } from '../studio/StudioActions'
import { RESELLER_ADDED, RESELLER_REMOVED } from '../../ui/profile/ResellerActions'

const initialState = []

const resellersReducer = (state = initialState, action) => {
  if (action.type === 'persist/REHYDRATE') {
    return action.payload.resellers || initialState
  } else if (action.type === RESELLERS_LOADED) {
    return action.resellers.filter(reseller => reseller.address !== addresses.blank)
  } else if (action.type === RESELLER_ADDED) {
    const resellers = Array.from(state)
    const { address, name } = action
    resellers.push({ address, name })
    return resellers
  } else if (action.type === RESELLER_REMOVED) {
    const resellers = Array.from(state).filter(reseller => reseller.address !== action.address)
    return resellers
  }
  return state
}

export default resellersReducer