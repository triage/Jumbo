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
