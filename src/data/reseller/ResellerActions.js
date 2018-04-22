export const RESELLER_LOAD = 'RESELLER_LOAD'
export const resellerLoad = reseller => ({
  type: RESELLER_LOAD,
  reseller,
})

export const RESELLER_LOADED = 'RESELLER_LOADED'
export const resellerLoaded = studios => ({
  type: RESELLER_LOADED,
  studios,
})
