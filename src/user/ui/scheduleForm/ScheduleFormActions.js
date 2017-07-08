export const SCHEDULE_INSTRUCTOR_CHANGED = 'SCHEDULE_INSTRUCTOR_CHANGED'
export const scheduleInstructorChanged = instructor => {
  return {
    type: SCHEDULE_INSTRUCTOR_CHANGED,
    instructor
  }
}

export const SCHEDULE_DATES_CHANGED = 'SCHEDULE_DATES_CHANGED'
export const scheduleDatesChanged = (start, end) => {
  return {
    type: SCHEDULE_DATES_CHANGED,
    start,
    end
  }
}

export const SCHEDULE_CLASS_CHANGED = 'SCHEDULE_CLASS_CHANGED'
export const scheduleClassChanged = (classAddress, history) => {
  return {
    type: SCHEDULE_CLASS_CHANGED,
    class: classAddress ? classAddress : null,
    history
  }
}

export const SCHEDULE_SUBMIT = "SCHEDULE_SUBMIT"
export const scheduleSubmit = history => {
  return {
    type: SCHEDULE_SUBMIT,
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

export const SCHEDULE_NUMBER_SPOTS_CHANGED = "SCHEDULE_NUMBER_SPOTS_CHANGED"
export const numberSpotsChanged = numberOfSpots => {
  return {
    type: SCHEDULE_NUMBER_SPOTS_CHANGED,
    numberOfSpots
  }
}

export const SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED = "SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED"
export const numberResellerSpotsChanged = numberOfSpots => {
  return {
    type: SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED,
    numberOfSpots
  }
}

export const SCHEDULE_PRICE_INDIVIDUAL_CHANGED = "SCHEDULE_PRICE_INDIVIDUAL_CHANGED"
export const priceIndividualChanged = price => {
  return {
    type: SCHEDULE_PRICE_INDIVIDUAL_CHANGED,
    price
  }
}

export const SCHEDULE_PRICE_RESELLER_CHANGED = "SCHEDULE_PRICE_RESELLER_CHANGED"
export const priceResellerChanged = price => {
  return {
    type: SCHEDULE_PRICE_RESELLER_CHANGED,
    price
  }
}
