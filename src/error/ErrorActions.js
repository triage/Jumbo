export const ERROR_DISPATCH = "jumbo/error/report"
export const errorDispatch = message => ({
  type: ERROR_DISPATCH,
  message
})

export const ERROR_ACKNOWLEDGE = "jumbo/error/acknowledge"
export const errorAcknowledge = error => {
  type: ERROR_ACKNOWLEDGE,
  error
}
