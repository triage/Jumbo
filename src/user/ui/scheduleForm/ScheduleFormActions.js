export const SCHEDULE_SUBMIT = "SCHEDULE_SUBMIT"
export const scheduleSubmit = (values, history) => ({
  type: SCHEDULE_SUBMIT,
  values,
  history
})

export const SCHEDULE_CREATED = "SCHEDULE_CREATED"
export const scheduleCreated = contract => ({
    type: SCHEDULE_CREATED,
    contract: contract
})

export const SCHEDULE_CREATE_ERROR = "SCHEDULE_CREATE_ERROR"
export const scheduleCreateError = error => ({
  type: SCHEDULE_CREATE_ERROR,
  error
})
