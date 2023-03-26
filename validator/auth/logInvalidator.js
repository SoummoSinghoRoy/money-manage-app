const logInValidation = (user) => {
  let error = {}

  if(!user.email) {
    error.email = `Email can't be empty`
  }

  if(!user.password) {
    error.password = `Password can't be empty`
  }
  return {
    error,
    isValid: Object.keys(error).length === 0
  }
}

module.exports = logInValidation;