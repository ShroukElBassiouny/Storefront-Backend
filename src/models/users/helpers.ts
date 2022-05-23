import { User } from './usersmodel'

export const ParametersValidation = (user: User) => {
  const { firstName, lastName, password } = user
  if (firstName && lastName && password) {
    return true
  }
  return false
}
