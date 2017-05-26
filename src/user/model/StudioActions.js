export const STUDIO_INFO_LOAD = 'STUDIO_INFO_LOAD'
export const STUDIO_INFO_LOADED = 'STUDIO_INFO_LOADED'
export const STUDIO_INFO_ERROR = 'STUDIO_INFO_ERROR'

export const studioInfoLoad = (studio) => {
  return {
    type: STUDIO_INFO_LOAD,
    studio
  }
}

export const studioInfoLoaded = (name, contactDetails) => {
  return {
    type: STUDIO_INFO_LOADED,
    name,
    contactDetails
  }
}

export const studioInfoError = (error) => {
  return {
    type: STUDIO_INFO_ERROR,
    error
  }
}
