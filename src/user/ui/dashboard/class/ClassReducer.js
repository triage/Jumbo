import { CLASS_CREATED } from '/src/user/model/ClassesActions'

const initialState = {
  classes: []
}

const classesReducer = (state = initialState, action) => {
  if (action.type === CLASS_CREATED)
  {

    let classes = state.classes
    classes.push(action.class)
    debugger

    return Object.assign({}, state, {
      classes: classes
    })
  }

  return state
}

export default classesReducer
