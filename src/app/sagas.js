import { watchClassesLoad } from 'user/data/classes/Classes.saga'
import { watchCreateClass } from 'user/ui/class/CreateClass.saga'
import { watchStudioLoad } from 'user/data/studio/Studio.saga'
import { watchSchedulesLoad } from 'user/data/schedule/Schedule.saga'
import { watchScheduleSubmit } from 'user/ui/scheduleForm/ScheduleForm.saga'
import { watchScheduleCancel } from 'user/ui/schedule/ScheduleDetail.saga'
import { watchUserSignup } from 'user/ui/signupform/SignUpForm.saga'
import { watchIndividualLoad } from 'user/data/individual/Individual.saga'
import { watchResellers } from 'user/ui/profile/Resellers.saga'
import { watchUserUpdate } from 'user/ui/profile/Profile.saga'
import { watchResellerLoad } from 'user/data/reseller/Reseller.saga'

/* eslint-disable import/prefer-default-export */
export function* rootSaga() {
  yield [
    watchCreateClass(),
    watchClassesLoad(),
    watchStudioLoad(),
    watchScheduleSubmit(),
    watchSchedulesLoad(),
    watchScheduleCancel(),
    watchUserSignup(),
    watchIndividualLoad(),
    watchResellers(),
    watchUserUpdate(),
    watchResellerLoad(),
  ]
}
