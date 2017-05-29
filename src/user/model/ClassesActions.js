export const CLASSES_LOAD = 'CLASSES_LOAD'
export const classesLoad = (studio) => {
  return {
    type: CLASSES_LOAD,
    studio,
  }
}

export const CLASSES_LOADED = 'CLASSES_LOADED'
export function classesLoaded(classes) {
  return {
    type: CLASSES_LOADED,
    classes,
  }
}

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
export function classCreated(classObject) {
  return {
    type: CLASS_CREATED,
    class: classObject
  }
}
