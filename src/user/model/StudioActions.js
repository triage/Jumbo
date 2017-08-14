export const STUDIO_INFO_LOAD = 'STUDIO_INFO_LOAD'
export const STUDIO_INFO_LOADED = 'STUDIO_INFO_LOADED'
export const STUDIO_INFO_ERROR = 'STUDIO_INFO_ERROR'
export const STUDIO_LOADED = 'STUDIO_LOADED'
export const STUDIO_LOAD = 'STUDIO_LOAD'

export const studioInfoLoad = studio => ({
  type: STUDIO_INFO_LOAD,
  studio
})

export const studioLoad = studio => ({
  type: STUDIO_LOAD,
  studio
})

export const studioInfoLoaded = (name, contactDetails) => ({
  type: STUDIO_INFO_LOADED,
  name,
  contactDetails
})

export const studioInfoError = error => ({
  type: STUDIO_INFO_ERROR,
  error
})
