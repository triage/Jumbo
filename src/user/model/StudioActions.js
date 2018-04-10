export const STUDIO_INFO_LOAD = 'STUDIO_INFO_LOAD';
export const STUDIO_INFO_LOADED = 'STUDIO_INFO_LOADED';
export const STUDIO_INFO_ERROR = 'STUDIO_INFO_ERROR';
export const STUDIO_LOADED = 'STUDIO_LOADED';
export const STUDIO_LOAD = 'STUDIO_LOAD';
export const RESELLERS_LOAD = 'RESELLERS_LOAD';
export const RESELLERS_LOADED = 'RESELLERS_LOADED';

export const studioInfoLoad = address => ({
  type: STUDIO_INFO_LOAD,
  address,
});

export const studioLoad = address => ({
  type: STUDIO_LOAD,
  address,
});

export const studioInfoLoaded = (name, contactDetails) => ({
  type: STUDIO_INFO_LOADED,
  name,
  contactDetails,
});

export const studioInfoError = error => ({
  type: STUDIO_INFO_ERROR,
  error,
});

export const resellersLoad = () => ({
  type: RESELLERS_LOAD,
});

export const resellersLoaded = resellers => ({
  type: RESELLERS_LOADED,
  resellers,
});
