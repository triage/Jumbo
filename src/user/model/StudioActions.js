export const STUDIO_INFO_LOAD = 'studioInfoLoad'
export const STUDIO_INFO_LOADED = 'studioInfoLoaded'

export function studioInfoLoaded(name, contactDetails) {
  return {
    type: STUDIO_INFO_LOADED,
    name,
    contactDetails
  }
}

export function studioInfoLoad(address) {
  return {
    type: STUDIO_INFO_LOAD,
    address
  }
}