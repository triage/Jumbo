import { watchClassesLoad } from 'data/classes/Classes.saga'
import { watchCreateClass } from 'ui/class/CreateClass.saga'
import { watchStudioLoad } from 'data/studio/Studio.saga'
import { watchSchedulesLoad } from 'data/schedule/Schedule.saga'
import { watchScheduleSubmit } from 'ui/scheduleForm/ScheduleForm.saga'
import { watchScheduleCancel } from 'ui/schedule/ScheduleDetail.saga'
import { watchUserSignup } from 'ui/signupform/SignUpForm.saga'
import { watchIndividualLoad } from 'data/individual/Individual.saga'
import { watchResellers } from 'ui/profile/Resellers.saga'
import { watchUserUpdate } from 'ui/profile/Profile.saga'
import { watchResellerLoad } from 'data/reseller/Reseller.saga'

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
