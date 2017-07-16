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
