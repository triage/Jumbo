export const SCHEDULE_LOAD = 'SCHEDULE_LOAD'
export const scheduleLoad = (address) => ({
    type: SCHEDULE_LOAD,
    address
})

export const SCHEDULES_LOADED = 'SCHEDULES_LOADED'
export const schedulesLoaded = (schedules) => ({
    type: SCHEDULES_LOADED,
    schedules
})

export const SCHEDULES_LOAD = 'SCHEDULES_LOAD'
export const schedulesLoad = (studio) => ({
    type: SCHEDULES_LOAD,
    studio
})

export const SCHEDULE_ADDED = 'SCHEDULE_ADDED'
export const scheduleAdded = (schedule) => ({
    type: SCHEDULE_ADDED,
    schedule
})

export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL'
export const scheduleCancel = (schedule) => ({
    type: SCHEDULE_CANCEL,
    schedule
})
