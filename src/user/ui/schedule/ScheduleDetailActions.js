export const SCHEDULE_CANCEL = 'SCHEDULE_CANCEL';
export const scheduleCancel = (schedule, reason, history) => ({
  type: SCHEDULE_CANCEL,
  schedule,
  reason,
  history,
});

export const SCHEDULE_CANCELLED = 'SCHEDULE_CANCELLED';
export const scheduleCancelled = schedule => ({
  type: SCHEDULE_CANCEL,
  schedule,
});

export const SCHEDULE_COMPLETE = 'SCHEDULE_COMPLETE';
export const scheduleComplete = (schedule, history) => ({
  type: SCHEDULE_COMPLETE,
  schedule,
  history,
});

export const SCHEDULE_COMPLETED = 'SCHEDULE_COMPLETED';
export const scheduleCompleted = (schedule, history) => ({
  type: SCHEDULE_COMPLETED,
  schedule,
  history,
});

export const SPOT_PURCHASE = 'SPOT_PURCHASE';
export const spotPurchase = (schedule, individual, history, location) => ({
  type: SPOT_PURCHASE,
  schedule,
  individual,
  history,
  location,
});

export const SPOT_CANCEL = 'SPOT_CANCEL';
export const spotCancel = (schedule, individual, history, location) => ({
  type: SPOT_CANCEL,
  schedule,
  individual,
  history,
  location,
});

export const SPOT_PURCHASED = 'SPOT_PURCHASED';
export const spotPurchased = (schedule, history) => ({
  type: SPOT_PURCHASED,
  schedule,
  history,
});

export const SPOT_CANCELLED = 'SPOT_CANCELLED';
export const spotCancelled = (schedule, history) => ({
  type: SPOT_CANCELLED,
  schedule,
  history,
});
