import { watchClassesLoad } from './user/model/ClassesSaga'
import { watchCreateClass } from './user/ui/class/CreateClassSaga'
import { watchStudioLoad } from './user/model/StudioSaga'

export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad(),
    watchStudioLoad()
  ]
}