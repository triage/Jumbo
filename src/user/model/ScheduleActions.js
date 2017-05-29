export const SCHEDULES_LOADED = 'SCHEDULES_LOADED'
export const schedulesLoaded = (schedules) => {
    return {
        type: SCHEDULES_LOADED,
        schedules
    }
}

export const SCHEDULES_LOAD = 'SCHEDULES_LOAD'
export const schedulesLoad = (studio) => {
    return {
        type: SCHEDULES_LOAD,
        studio
    }
}

export const SCHEDULE_ADDED = 'SCHEDULE_ADDED'
export const scheduleAdded = (schedule) => {
    return {
        type: SCHEDULE_ADDED,
        schedule
    }
}
