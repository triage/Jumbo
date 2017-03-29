export const CLASS_CREATE = 'CLASS_CREATE'
export function classCreate(studio, name, description) {
  return {
    type: CLASS_CREATE,
    studio,
    name,
    description
  }
}

export const CLASS_CREATED = 'CLASS_CREATED'
export function classCreated(newClass) {
  return {
    type: CLASS_CREATED,
    class: newClass
  }
}
