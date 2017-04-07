export const CLASSES_LOAD = 'CLASSES_LOAD'
export function classesLoad(address) {
  return {
    type: CLASSES_LOAD,
    address: address
  }
}

export const CLASSES_LOADED = 'CLASSES_LOADED'
export function classesLoaded(classes) {
  return {
    type: CLASSES_LOADED,
    classes,
  }
}

export const CLASS_NAME_LOADED = 'CLASS_NAME_LOADED'
export function classNameLoaded(address, name) {
  return {
    type: CLASS_NAME_LOADED,
    address,
    name
  }
}

export const CLASS_DESCRIPTION_LOADED = 'CLASS_DESCRIPTION_LOADED'
export function classDescriptionLoaded(address, description) {
  return {
    type: CLASS_DESCRIPTION_LOADED,
    address,
    name
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
export function classCreated(newClass) {
  return {
    type: CLASS_CREATED,
    class: newClass
  }
}
