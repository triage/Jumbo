import { watchCreateClass, watchClassesLoad } from './user/model/ClassesSaga'

export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad()
  ]
}