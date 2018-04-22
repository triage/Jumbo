export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL'

export interface ScheduleCancel {
  type: string
  schedule: string
  reason: string
  history: {
    push: (url: string, params: object) => void
  }
}

export const scheduleCancel = (schedule: string, reason: string, history: object) => ({
  type: SCHEDULE_CANCEL,
  schedule,
  reason,
  history,
}) as ScheduleCancel

export const SCHEDULE_CANCELLED = 'SCHEDULE_CANCELLED'
export const scheduleCancelled = (schedule: string) => ({
  type: SCHEDULE_CANCEL,
  schedule,
})

export interface ScheduleComplete {
  type: string
  schedule: string
  history: {
    push: (path: string) => void
  }
}

export const SCHEDULE_COMPLETE = 'SCHEDULE_COMPLETE'
export const scheduleComplete = (schedule: string, history: object) => ({
  type: SCHEDULE_COMPLETE,
  schedule,
  history,
} as ScheduleComplete)

export const SCHEDULE_COMPLETED = 'SCHEDULE_COMPLETED'
export const scheduleCompleted = (schedule: string, history: object) => ({
  type: SCHEDULE_COMPLETED,
  schedule,
  history,
})

export const SPOT_PURCHASE = 'SPOT_PURCHASE'

export interface SpotPurchase {
  type: string
  schedule: string
  price: string
  individual: string
  history: object
  location: object
}

export const spotPurchase = (
  schedule: string,
  individual: string,
  price: string,
  history: object,
  location: object) => ({
    type: SPOT_PURCHASE,
    schedule,
    price,
    individual,
    history,
    location,
  } as SpotPurchase)

export interface SpotCancel {
  type: string
  schedule: string
  individual: string
  history: object
  location: object
}

export const SPOT_CANCEL = 'SPOT_CANCEL'
export const spotCancel = (schedule: string, individual: string, history: object, location: object) => ({
  type: SPOT_CANCEL,
  schedule,
  individual,
  history,
  location,
}) as SpotCancel

export const SPOT_PURCHASED = 'SPOT_PURCHASED'
export const spotPurchased = (schedule: string, history: object) => ({
  type: SPOT_PURCHASED,
  schedule,
  history,
})

export const SPOT_CANCELLED = 'SPOT_CANCELLED'
export const spotCancelled = (schedule: string, history: object) => ({
  type: SPOT_CANCELLED,
  schedule,
  history,
})
