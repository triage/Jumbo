export const CLASS_CREATE = 'CLASS_CREATE'
export function classCreate(name, description, history) {
  return {
    type: CLASS_CREATE,
    name,
    description,
    history
  }
}

export const CLASS_CREATED = 'CLASS_CREATED'
export function classCreated(classObject) {
  return {
    type: CLASS_CREATED,
    class: classObject
  }
}
