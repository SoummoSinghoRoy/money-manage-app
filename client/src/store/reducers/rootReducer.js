import { combineReducers } from '@reduxjs/toolkit'

import { signUpReducer, logInReducer } from './authReducer';
import { allTransactionReducer, createTransactionReducer, deleteTransactionReducer, editTransactionReducer } from './transactionReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  logIn: logInReducer,
  allTransactions: allTransactionReducer,
  createTransaction: createTransactionReducer,
  deleteTransaction: deleteTransactionReducer,
  editTransaction: editTransactionReducer,
})

export default rootReducer;