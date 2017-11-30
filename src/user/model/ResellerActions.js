export const RESELLER_LOAD = 'RESELLER_LOAD'
export const resellerLoad = () => ({
  type: RESELLER_LOAD,
})

export const RESELLER_LOADED = 'RESELLER_LOADED'
export const resellerLoaded = studios => ({
  type: RESELLER_LOADED,
  studios
})
