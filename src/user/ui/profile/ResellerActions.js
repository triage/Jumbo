export const RESELLER_ADD = 'RESELLER_ADD'
export const resellerAdd = address => ({
  type: RESELLER_ADD,
  address
})

export const RESELLER_ADDED = 'RESELLER_ADDED'
export const resellerAdded = address => ({
  type: RESELLER_ADDED,
  address
})

export const RESELLER_REMOVE = 'RESELLER_REMOVE'
export const resellerRemove = address => ({
  type: RESELLER_REMOVE,
  address
})

export const RESELLER_REMOVED = 'RESELLER_REMOVED'
export const resellerRemoved = address => ({
  type: RESELLER_REMOVED,
  address
})
