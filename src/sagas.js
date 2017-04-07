import { watchClassesLoad } from './user/model/ClassesSaga'
import { watchCreateClass } from './user/ui/dashboard/class/CreateClassSaga'

export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad()
  ]
}