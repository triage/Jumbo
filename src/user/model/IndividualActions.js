
export const INDIVIDUAL_LOAD = 'INDIVIDUAL_LOAD'
export const individualLoad = individual => ({
  type: INDIVIDUAL_LOAD,
  individual
})


export const INDIVIDUAL_LOADED = 'INDIVIDUAL_LOADED'
export const individualLoaded = schedules => ({
  type: INDIVIDUAL_LOADED,
  schedules
})
