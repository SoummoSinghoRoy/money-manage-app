const Transaction = require('../model/Transaction');
const User = require('../model/User');

const { resourceError, serverError } = require('../utils/error');
const transactionCreateValidation = require('../validator/transaction/transactionCreateValidatior');

exports.transactionsGetContoller = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id})
    const transactions = await Transaction.find({user: user._id})
                                          .populate("user")

    if(transactions.length !== 0) {
      res.status(200).json({
        transactions,
        totalTransaction: transactions.length,
        user
      })
    }else {
      resourceError(res, "Transactions empty!")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.createTransactionPostController = async (req, res) => {
  const { amount, transactionType, date, description } = req.body;
  const userId = req.user._id;

  const validation = transactionCreateValidation({ amount, transactionType, date, description })
  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }
  try {
    const user = await User.findOne({_id: userId})

    const addTransaction = new Transaction({
      amount, transactionType, date, description, user: user._id
    })
    const transaction = await addTransaction.save()

    let updatedNetBalance = 0;
    let updatedIncome = 0;
    let updatedExpense = 0;

    if(transaction.transactionType === 'Income') {
      updatedIncome = user.income + transaction.amount
      updatedNetBalance = user.netBalance + transaction.amount
      updatedExpense = user.expense
    } else if(transaction.transactionType === 'Expense') {
      updatedExpense = user.expense + transaction.amount
      updatedNetBalance = user.netBalance - transaction.amount
      updatedIncome = user.income
    }

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {"transactions": transaction._id},
        $set: {
          "netBalance": updatedNetBalance,
          "income": updatedIncome,
          "expense": updatedExpense,
        },
      },
    )

    res.status(200).json({
      msg: "Transaction created successfully",
      transaction,
    })
  } catch (error) {
    serverError(res, error)
  }
}

exports.singleTransactionGetController = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findOne({_id: transactionId})
    if(transaction) {
      res.status(200).json({
        transaction,
      })
    }else {
      resourceError(res, "Transactions empty!")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.transactionEditController = async (req, res) => {
  const { amount, transactionType, date, description } = req.body;
  const {transactionId} = req.params;
  const userId = req.user.id;
  const user = await User.findOne({_id: userId})
  const transaction = await Transaction.findOne({user: user._id, _id: transactionId})

  try {
    if(transaction) {
      const addTransaction = { amount, transactionType, date, description }
      const updatedTransaction = await Transaction.findOneAndUpdate(
        { _id: transaction._id },
        { $set: addTransaction },
        { new: true }
      )

      let updatedNetBalance = 0;
      let updatedIncome = 0;
      let updatedExpense = 0;

      if(updatedTransaction.transactionType === 'Income') {
        updatedIncome = (user.income - transaction.amount) + updatedTransaction.amount
        updatedNetBalance = (user.netBalance - transaction.amount) + updatedTransaction.amount
        updatedExpense = user.expense
      } else if(updatedTransaction.transactionType === 'Expense') {
        updatedExpense = (user.expense - transaction.amount) + updatedTransaction.amount
        updatedNetBalance = (user.netBalance + transaction.amount) - updatedTransaction.amount
        updatedIncome = user.income
      }

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            "netBalance": updatedNetBalance,
            "income": updatedIncome,
            "expense": updatedExpense,
          },
        },
      )
      res.status(200).json({
        msg: "Transaction updated successfully",
        updatedTransaction
      })
    }else {
      resourceError(res, "Transaction not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.transactionDeleteController = async (req, res) => {
  const {transactionId} = req.params;
  const userId = req.user._id;
  const user = await User.findOne({_id: userId})
  const transaction = await Transaction.findOne({user: user._id, _id: transactionId})

  try {
    if(transaction) {
      const deletedTransaction = await Transaction.findOneAndDelete({_id: transaction._id})

      let updatedNetBalance = 0;
      let updatedIncome = 0;
      let updatedExpense = 0;
      
      if(deletedTransaction.transactionType === 'Income') {
        updatedIncome = user.income - deletedTransaction.amount
        updatedNetBalance = user.netBalance - deletedTransaction.amount
        updatedExpense = user.expense
      }else if(deletedTransaction.transactionType === 'Expense') {
        updatedExpense = user.expense - deletedTransaction.amount
        updatedNetBalance = user.netBalance + deletedTransaction.amount
        updatedIncome = user.income
      }
      await User.findOneAndUpdate(
        { _id: userId },
        { 
          $pull: {"transactions": deletedTransaction._id},
          $set: {
            "income": user.income === 0 ? 0 : updatedIncome,
            "expense": user.expense === 0 ? 0 : updatedExpense,
            "netBalance": user.netBalance === 0 ? 0 : updatedNetBalance
          } 
        }
      )
      res.status(200).json({
        Message: "Transaction successfully deleted",
        deletedTransaction
      })
    }else {
      resourceError(res, "Transaction not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}