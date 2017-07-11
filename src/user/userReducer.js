import { USER_LOGGED_IN} from 'src/user/ui/signupform/SignUpFormActions'

const initialState = {
  data: null
}

const userReducer = (state = initialState, action) => {
  if (action.type === USER_LOGGED_IN || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.data
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default userReducer
