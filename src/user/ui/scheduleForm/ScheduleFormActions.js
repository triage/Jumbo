export const SCHEDULE_DATE_CHANGED = 'SCHEDULE_DATE_CHANGED'
export const scheduleDateChanged = (date) => {
  return {
    type: SCHEDULE_DATE_CHANGED,
    date
  }
}

export const SCHEDULE_INSTRUCTOR_CHANGED = 'SCHEDULE_INSTRUCTOR_CHANGED'
export const scheduleInstrctorChanged = (instructor) => {
  return {
    type: SCHEDULE_INSTRUCTOR_CHANGED,
    instructor
  }
}

export const SCHEDULE_CLASS_CHANGED = 'SCHEDULE_CLASS_CHANGED'
export const scheduleClassChanged = (classObj) => {
  return {
    type: SCHEDULE_CLASS_CHANGED,
    class: classObj
  }
}
