export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL'
export const scheduleCancel = (schedule, reason) => ({
    type: SCHEDULE_CANCEL,
    schedule,
    reason
})
