import axios from 'axios';

import * as Types from './types';

export const allTransactionAction = () => (dispatch) => {
  axios.get('api/transaction').then((response) => {
    dispatch({
      type: Types.All_Transaction,
      payload: {
        transactions: response.data.transactions,
        totalTransaction: response.data.totalTransaction,
        userInfo: response.data.user
      }
    })
  }).catch((error) => {
    console.log(error);
  })
}

export const createTransactionAction = (transaction) => (dispatch) => {
  axios.post('api/transaction/createTransaction', transaction).then((response)=> {
    dispatch({
      type: Types.Transaction_Create,
      payload: {
        transaction: response.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: Types.Transaction_Create_Error,
      payload: {
        error: error.response.data
      }
    })
  })
}

export const deleteTransactionAction = (transactionId) => (dispatch) => {
  axios.delete(`api/transaction/delete/${transactionId}`).then((response) => {
    dispatch({
      type: Types.Transaction_Delete,
      payload: {
        deletedTransactionId: response.data.deletedTransaction._id,
        successMessage: `Transaction deleted successfully`
      }
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: Types.Transaction_Delete_Error,
      payload: {
        errorMessage: `Transaction isn't deleted`
      }
    })
  })
}

export const editTransactionAction = (transactionId, updatedTransaction) => (dispatch) => {
  axios.put(`api/transaction/edit/${transactionId}`, updatedTransaction).then((response) => {
    dispatch({
      type: Types.Transaction_Edit,
      payload: {
        updatedTransaction: response.data.updatedTransaction,
        successMessage: response.data.msg
      }
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: Types.Transaction_Edit_Error,
      payload: {
        errorMessage: `Transaction can't update`
      }
    })
  })
}