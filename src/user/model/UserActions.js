export const USER_PURGE = 'USER_PURGE'
export const userPurge = () => ({
  type: USER_PURGE,
})

export const BALANCE_UPDATED = 'BALANCE_UPDATED'
export const balanceUpdated = balance => ({
  type: BALANCE_UPDATED,
  balance,
})
