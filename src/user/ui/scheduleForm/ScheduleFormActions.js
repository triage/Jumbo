export const SCHEDULE_INSTRUCTOR_CHANGED = 'SCHEDULE_INSTRUCTOR_CHANGED'
export const scheduleInstructorChanged = (instructor) => {
  return {
    type: SCHEDULE_INSTRUCTOR_CHANGED,
    instructor
  }
}

export const SCHEDULE_DATE_START_CHANGED = 'SCHEDULE_TIME_START_CHANGED'
export const scheduleDateStartChanged = (date) => {
  return {
    type: SCHEDULE_DATE_START_CHANGED,
    date
  }
}

export const SCHEDULE_DATE_END_CHANGED = 'SCHEDULE_TIME_END_CHANGED'
export const scheduleDateEndChanged = (date) => {
  return {
    type: SCHEDULE_DATE_END_CHANGED,
    date
  }
}

export const SCHEDULE_CLASS_CHANGED = 'SCHEDULE_CLASS_CHANGED'
export const scheduleClassChanged = (classAddress) => {
  return {
    type: SCHEDULE_CLASS_CHANGED,
    class: classAddress ? classAddress : null
  }
}

export const SCHEDULE_SUBMIT = "SCHEDULE_SUBMIT"
export const scheduleSubmit = () => {
  return {
    type: SCHEDULE_SUBMIT
  }
}

export const SCHEDULE_CREATED = "SCHEDULE_CREATED"
export const scheduleCreated = (contract) => {
  return {
    type: SCHEDULE_CREATED,
    contract: contract
  }
}

export const SCHEDULE_CREATE_ERROR = "SCHEDULE_CREATE_ERROR"
export const scheduleCreateError = (error) => {
  return {
    type: SCHEDULE_CREATE_ERROR,
    error
  }
}

export const SCHEDULE_NUMBER_SPOTS_CHANGED = "SCHEDULE_NUMBER_SPOTS_CHANGED"
export const numberSpotsChanged = (numberOfSpots) => {
  return {
    type: SCHEDULE_NUMBER_SPOTS_CHANGED,
    numberOfSpots
  }
}

export const SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED = "SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED"
export const numberResellerSpotsChanged = (numberOfSpots) => {
  return {
    type: SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED,
    numberOfSpots
  }
}

export const SCHEDULE_PRICE_INDIVIDUAL_CHANGED = "SCHEDULE_PRICE_INDIVIDUAL_CHANGED"
export const priceIndividualChanged = (price) => {
  return {
    type: SCHEDULE_PRICE_INDIVIDUAL_CHANGED,
    price
  }
}

export const SCHEDULE_PRICE_RESELLER_CHANGED = "SCHEDULE_PRICE_RESELLER_CHANGED"
export const priceResellerChanged = (price) => {
  return {
    type: SCHEDULE_PRICE_RESELLER_CHANGED,
    price
  }
}
