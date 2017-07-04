export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL'
export const scheduleCancel = (schedule, message) => ({
    type: SCHEDULE_CANCEL,
    schedule,
    message
})
