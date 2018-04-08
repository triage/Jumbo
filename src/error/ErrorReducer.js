import { ERROR_DISPATCH, ERROR_ACKNOWLEDGE } from './ErrorActions'

const initialState = []

export default (state = initialState, action) => {
  if (action.type === ERROR_DISPATCH) {
    return Array.contact(state.errors, [action.error])
  } else if (action.type === ERROR_ACKNOWLEDGE) {
    return state.filter(error => {
      return error !== action.error
    })
  }
  return state
}

