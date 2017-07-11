export const SCHEDULE_SUBMIT = "SCHEDULE_SUBMIT"
export const scheduleSubmit = (values, history) => {
  return {
    type: SCHEDULE_SUBMIT,
    values,
    history
  }
}

export const SCHEDULE_CREATED = "SCHEDULE_CREATED"
export const scheduleCreated = contract => {
  return {
    type: SCHEDULE_CREATED,
    contract: contract
  }
}

export const SCHEDULE_CREATE_ERROR = "SCHEDULE_CREATE_ERROR"
export const scheduleCreateError = error => {
  return {
    type: SCHEDULE_CREATE_ERROR,
    error
  }
}
