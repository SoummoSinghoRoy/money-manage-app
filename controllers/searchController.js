const Transaction = require('../model/Transaction');
const { resourceError, serverError } = require('../utils/error');

exports.searchResultController = async (req, res) => {
  const { searchterm } = req.params;
  try {
    const transactions = await Transaction.find({
      $text: {$search: searchterm}
    })
    if(transactions.length !== 0) {
      res.status(200).json({
        transactions,
        searchterm,
        totalTransaction: transactions.length
      })
    }else {
     resourceError(res, "Transactions empty!")
    }
  } catch (error) {
    serverError(res, error)
  }
}