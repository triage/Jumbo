export const SCHEDULE_LOAD = 'SCHEDULE_LOAD';
export const scheduleLoad = address => ({
  type: SCHEDULE_LOAD,
  address,
});

export const SCHEDULE_LOADED = 'SCHEDULE_LOADED';
export const scheduleLoaded = schedule => ({
  type: SCHEDULE_LOADED,
  schedule,
});

export const SCHEDULES_LOADED = 'SCHEDULES_LOADED';
export const schedulesLoaded = (address, schedules) => ({
  type: SCHEDULES_LOADED,
  address,
  schedules,
});

export const SCHEDULES_LOAD = 'SCHEDULES_LOAD';
export const schedulesLoad = address => ({
  type: SCHEDULES_LOAD,
  address,
});

export const SCHEDULE_ADDED = 'SCHEDULE_ADDED';
export const scheduleAdded = schedule => ({
  type: SCHEDULE_ADDED,
  schedule,
});
