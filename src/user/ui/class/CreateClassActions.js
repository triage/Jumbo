export const CLASS_CREATE = 'CLASS_CREATE'
export const classCreate = (name, description, history, location) => ({
  type: CLASS_CREATE,
  name,
  description,
  history,
  location
})

export const CLASS_CREATED = 'CLASS_CREATED'
export const classCreated = classObject => ({
  type: CLASS_CREATED,
  class: classObject
})
