export const USER_UPDATED = 'USER_UPDATED'
export const userUpdated = (name, contactDetails) => ({
  type: USER_UPDATED,
  name,
  contactDetails,
})

export const USER_UPDATE = 'USER_UPDATE'
export const userUpdate = (name, contactDetails) => ({
  type: USER_UPDATE,
  name,
  contactDetails,
})
