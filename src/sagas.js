import { watchClassesLoad } from './user/model/ClassesSaga'
import { watchCreateClass } from './user/ui/class/CreateClassSaga'
import { watchStudioLoad } from './user/model/StudioSaga'
import { watchSchedulesLoad } from './user/model/ScheduleSaga'
import { watchScheduleClassChanged, watchScheduleSubmit } from './user/ui/scheduleForm/ScheduleFormSaga'
import { watchScheduleCancel } from './user/ui/schedule/ScheduleDetailSaga'

export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad(),
    watchStudioLoad(),
    watchScheduleClassChanged(),
    watchScheduleSubmit(),
    watchSchedulesLoad(),
    watchScheduleCancel()
  ]
}
