import { watchClassesLoad } from './user/model/Classes.saga'
import { watchCreateClass } from './user/ui/class/CreateClass.saga'
import { watchStudioLoad } from './user/model/Studio.saga'
import { watchSchedulesLoad } from './user/model/Schedule.saga'
import { watchScheduleSubmit } from './user/ui/scheduleForm/ScheduleForm.saga'
import { watchScheduleCancel } from './user/ui/schedule/ScheduleDetail.saga'
import { watchUserSignup } from './user/ui/signupform/SignUpForm.saga'
import { watchIndividualLoad } from './user/model/Individual.saga'

export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad(),
    watchStudioLoad(),
    watchScheduleSubmit(),
    watchSchedulesLoad(),
    watchScheduleCancel(),
    watchUserSignup(),
    watchIndividualLoad()
  ]
}
