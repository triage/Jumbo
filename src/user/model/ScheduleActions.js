export const SCHEDULE_LOAD_DETAILS = "SCHEDULE_LOAD_DETAILS"
export const scheduleLoadDetails = (address) => {
    return {
        type: SCHEDULE_LOAD_DETAILS,
        address
    }
}
