export const ERROR_DISPATCH = 'jumbo/error/report'
export const errorDispatch = error => ({
  type: ERROR_DISPATCH,
  error,
})

export const ERROR_ACKNOWLEDGE = 'jumbo/error/acknowledge'
export const errorAcknowledge = error => ({
  type: ERROR_ACKNOWLEDGE,
  error,
})
