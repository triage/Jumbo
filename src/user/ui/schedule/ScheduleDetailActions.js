export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL'
export const scheduleCancel = (schedule, reason, history) => ({
    type: SCHEDULE_CANCEL,
    schedule,
    reason,
    history
})

export const SPOT_PURCHASE = 'SPOT_PURCHASE'
export const spotPurchase = (schedule, individual, history) => ({
    type: SPOT_PURCHASE,
    schedule,
    individual,
    history
})

export const SPOT_CANCEL = 'SPOT_CANCEL'
export const spotCancel = (schedule, individual, history) => ({
    type: SPOT_CANCEL,
    schedule,
    individual,
    history
})

