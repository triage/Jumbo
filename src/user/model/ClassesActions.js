export const CLASSES_LOAD = 'CLASSES_LOAD';
export const classesLoad = address => ({
  type: CLASSES_LOAD,
  address,
});

export const CLASSES_LOADED = 'CLASSES_LOADED';
export function classesLoaded(classes) {
  return {
    type: CLASSES_LOADED,
    classes,
  };
}
