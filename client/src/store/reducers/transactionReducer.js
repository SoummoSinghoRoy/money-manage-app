import * as Types from '../actions/types';

let initialState = {
  transactions: [],
  totalTransaction: 0,
  userInfo: {},
  error: {},
  
}

export const allTransactionReducer = (state= initialState, action) => {
  switch (action.type) {
    case Types.All_Transaction: {
      return {
        ...state,
        transactions: action.payload.transactions,
        totalTransaction: action.payload.totalTransaction,
        userInfo: action.payload.userInfo
      }
    };
    case Types.Searching: {
      return {
        ...state,
        transactions: action.payload.searchdata,
        totalTransaction: action.payload.totalTransaction
      }
    }
    default: return state
  }
}

let createTransactionState = {
  transaction: {},
  error: {}
}

export const createTransactionReducer = (state = createTransactionState, action) => {
  switch(action.type) {
    case Types.Transaction_Create: {
      return {
        ...state,
        transaction: action.payload.transaction,
      }
    };
    case Types.Transaction_Create_Error: {
      return {
        ...state,
        error: action.payload.error
      }
    };
    default: return state
  }
} 

let deletedTransactionState = {
  deletedTransactionId: '',
  deleteSuccessMsg: '',
  deleteErrorMsg: ''
}

export const deleteTransactionReducer = (state = deletedTransactionState, action) => {
  switch(action.type) {
    case Types.Transaction_Delete: {
      return {
        ...state,
        deletedTransactionId: action.payload.deletedTransactionId,
        deleteSuccessMsg: action.payload.successMessage
      }
    };
    case Types.Transaction_Delete_Error: {
      return {
        ...state,
        deleteErrorMsg: action.payload.errorMessage
      }
    };
    default: return state
  }
}

let editTransactionState = {
  updatedTransaction: {},
  successMessage: '',
  errorMessage: ''
}

export const editTransactionReducer = (state = editTransactionState, action) => {
  switch(action.type) {
    case Types.Transaction_Edit: {
      return {
        updatedTransaction: action.payload.updatedTransaction,
        successMessage: action.payload.successMessage, 
        errorMessage: ''
      }
    };
    case Types.Transaction_Edit_Error: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    };
    default: return state
  }
}