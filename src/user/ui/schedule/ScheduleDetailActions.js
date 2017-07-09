export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL'
export const scheduleCancel = (schedule, reason, history) => ({
    type: SCHEDULE_CANCEL,
    schedule,
    reason,
    history
})
