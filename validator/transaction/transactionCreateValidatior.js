const transactionCreateValidation = (transaction) => {
  let error= {};

  if(!transaction.amount) {
    error.amount = `Amount can't be empty`
  }
  if(!transaction.transactionType) {
    error.transactionType = `Must add type- income or expense`
  }
  if(!transaction.date) {
    error.date = `Date can't be empty`
  }
  if(!transaction.description) {
    error.description = `Description can't be empty`
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  }
}

module.exports = transactionCreateValidation;