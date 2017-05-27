export const SCHEDULE_LOAD_DETAILS = "SCHEDULE_LOAD_DETAILS"
export const scheduleLoadDetails = (address) => {
    return {
        type: SCHEDULE_LOAD_DETAILS,
        address
    }
}

export const SCHEDULE_DETAILS_LOADED = "SCHEDULE_DETAILS_LOADED"
export const scheduleDetailsLoaded = (schedule) => {
    return {
        type: SCHEDULE_DETAILS_LOADED,
        schedule
    }
}
