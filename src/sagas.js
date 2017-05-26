import { watchClassesLoad } from './user/model/ClassesSaga'
import { watchCreateClass } from './user/ui/class/CreateClassSaga'
import { watchStudioLoad } from './user/model/StudioSaga'
import { watchScheduleLoadDetails } from './user/model/ScheduleSaga'
import { watchScheduleClassChanged, watchScheduleSubmit } from './user/ui/scheduleForm/ScheduleFormSaga'

export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad(),
    watchStudioLoad(),
    watchScheduleClassChanged(),
    watchScheduleSubmit(),
    watchScheduleLoadDetails()
  ]
}
