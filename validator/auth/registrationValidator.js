const validator = require('validator');

const registrationValidation = (user) => {
  let error = {}

  if(!user.name) {
    error.name = `Name can't be empty`
  }

  if(!user.email) {
    error.email = `Email can't be empty`
  }else if(!validator.isEmail(user.email)) {
    error.email = `Must use valid email`
  }

  if(!user.password) {
    error.password = `Password can't be empty`
  }else if(!validator.isLength(user.password,{ min: 6})) {
    error.password = `Password length must be 6 to 12 charecter`
  }

  if(!user.confirmPassword) {
    error.confirmPassword = `Must confirm password`
  }else if(user.password !== user.confirmPassword) {
    error.confirmPassword = `Confirm password doesn't match`
  }else if(!validator.isLength(user.confirmPassword,{ min: 6})) {
    error.confirmPassword = `Confirm password length must be 6 to 12 charecter`
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  }
}

module.exports = registrationValidation;