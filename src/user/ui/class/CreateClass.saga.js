import { put, call, select, takeEvery, apply } from 'redux-saga/effects'
import { CLASS_CREATE, classCreated } from './CreateClassActions'
import eth from 'src/util/eth'

export function* doCreateClass(action) {

  const Class = eth.Class()
  const Studio = eth.Studio()

  try {
    //create the class
    const studio = yield Studio.deployed()
    const classInstance = yield apply(Class, Class.new, [action.name, action.description, eth.from()])
    
    //add the class to the studio
    yield apply(studio, studio.classAdded, [classInstance.address, eth.from()])
    yield put(classCreated({
      address: classInstance.address,
      name: action.name,
      description: action.description
    }))
    yield call(
      action.history.push,
      '/schedule/new',
      Object.assign({}, action.location.state,{ class: classInstance.address })
    )

  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchCreateClass() {
  yield takeEvery(CLASS_CREATE, doCreateClass)
}
