export const RESELLER_ADD = 'RESELLER_ADD'
export const resellerAdd = (address, name) => ({
  type: RESELLER_ADD,
  address,
  name,
})

export const RESELLER_ADDED = 'RESELLER_ADDED'
export const resellerAdded = (address, name) => ({
  type: RESELLER_ADDED,
  address,
  name,
})

export const RESELLER_REMOVE = 'RESELLER_REMOVE'
export const resellerRemove = address => ({
  type: RESELLER_REMOVE,
  address,
})

export const RESELLER_REMOVED = 'RESELLER_REMOVED'
export const resellerRemoved = address => ({
  type: RESELLER_REMOVED,
  address,
})
