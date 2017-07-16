export const SCHEDULE_LOAD = 'SCHEDULE_LOAD'
export const scheduleLoad = address => ({
    type: SCHEDULE_LOAD,
    address
})

export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'
export const scheduleLoaded = schedule => ({
    type: SCHEDULE_LOADED,
    schedule
})

export const SCHEDULES_LOADED = 'STUDIO_SCHEDULES_LOADED'
export const schedulesLoaded = schedules => ({
    type: SCHEDULES_LOADED,
    schedules
})

export const SCHEDULES_LOAD = 'SCHEDULES_LOAD'
export const schedulesLoad = studio => ({
    type: SCHEDULES_LOAD,
    studio
})

export const SCHEDULE_ADDED = 'SCHEDULE_ADDED'
export const scheduleAdded = schedule => ({
    type: SCHEDULE_ADDED,
    schedule
})
