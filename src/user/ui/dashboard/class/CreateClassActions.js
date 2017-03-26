
export const CLASS_CREATE = 'CLASS_CREATE'
export function classCreate(name, description) {
  return {
    type: CLASS_CREATE,
    name,
    description
  }
}
