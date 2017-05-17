export const SCHEDULE_DATE_CHANGED = 'SCHEDULE_DATE_CHANGED'
export const scheduleDateChanged = (date) => {
  return {
    type: SCHEDULE_DATE_CHANGED,
    date
  }
}

export const SCHEDULE_INSTRUCTOR_CHANGED = 'SCHEDULE_INSTRUCTOR_CHANGED'
export const scheduleInstructorChanged = (instructor) => {
  return {
    type: SCHEDULE_INSTRUCTOR_CHANGED,
    instructor
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
