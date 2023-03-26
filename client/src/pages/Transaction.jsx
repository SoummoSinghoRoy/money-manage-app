import React, {Component} from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Alert } from 'react-bootstrap';

import { allTransactionAction, deleteTransactionAction, editTransactionAction } from '../store/actions/transactionAction';
import { searchResultAction } from '../store/actions/searchAction';
import CreateTransactionModal from "../components/transaction/CreateTransaction";
import EditTransactionModal from "../components/transaction/EditTransaction";
import Pagination from "../components/Pagination";

class Dashboard extends Component {
  state = {
    transactionCreateModal: false,
    deleteMessageAlert: true,
    editAbleTransactionId: '',
    editTransactionModal: false,
    currentpage: 1,
    transactionsPerPage: 2
  }

  componentDidMount() {
    this.props.allTransactionAction()
  }

  componentDidUpdate() {
    let currentTransactions = [...this.props.allTransactions]
    let updatedTransaction = this.props.updateTransaction
    currentTransactions.map((transaction) => {
      if(transaction._id === updatedTransaction._id) {
        return transaction = updatedTransaction
      }
    })
  }
  
  openTransactionCreateModal = () => {
    this.setState({
      transactionCreateModal: true
    })
  }

  closeTransactionCreateModal = () => {
    this.setState({
      transactionCreateModal: false
    })
    this.props.allTransactionAction()
  }

  deleteTransaction = (transactionId) => {
    this.props.allTransactions.map((transaction) => {
      if(transaction._id === transactionId) {
        this.props.deleteTransactionAction(transactionId)
      }
    })
  }

  deleteTransactionAlertClose = () => {
    this.setState({
      messageAlert: false,
    })
    this.props.allTransactionAction()
  }

  openTransactionEditModal = (transactionId) => {
    this.setState({
      editAbleTransactionId: transactionId,
      editTransactionModal: true
    })
  }

  closeTransactionEditModal = () => {
    this.setState({
      editAbleTransactionId: '',
      editTransactionModal: false,
    })
    this.props.allTransactionAction()
  }

  searchChangeHandler = (event) => {
    const searchterm = event.target.value;
    if(searchterm) {
      this.props.searchResultAction(searchterm)
    }else {
      this.props.allTransactionAction()
    }
  }

  paginateClickHandler = (pageNumber) => {
    this.setState({
      currentpage: pageNumber
    })
  }
  previousPage = () => {
    if(this.state.currentpage !== 1) {
      this.setState({
        currentpage: this.state.currentpage - 1
      })
    }
  }
  nextPage = () => {
    if (this.state.currentpage !== Math.ceil(this.props.allTransactions.length /this.state.transactionsPerPage)) {
       this.setState({
        currentpage: this.state.currentpage + 1
       })
    }
 };
  

  render() {
    const { allTransactions, totalTransaction, userInfo, deleteSuccessMsg, deleteErrorMsg } = this.props

    const { currentpage, transactionsPerPage } = this.state;
    const indexOfLastTransaction = currentpage * transactionsPerPage;
    const indexOffastTransaction = indexOfLastTransaction - transactionsPerPage;
    const perPageTransactions = allTransactions.slice(indexOffastTransaction, indexOfLastTransaction);

    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-8">
            {(()=> {
              if(deleteSuccessMsg !== "") {
                return(
                  <Alert variant="success" show={this.state.deleteMessageAlert} onClose={this.deleteTransactionAlertClose} dismissible>
                    <p className="my-0 fw-bolder">{ deleteSuccessMsg }</p>
                  </Alert>
                )
              }else if(deleteErrorMsg !== "") {
                return(
                  <Alert variant="warning" show={this.state.deleteMessageAlert} onClose={this.deleteTransactionAlertClose} dismissible>
                    <p className="my-0 fw-bolder">{ deleteErrorMsg }</p>
                  </Alert>
                )
              }
             })()}
            <div className="table-responsive">
              <table className="table table-bordered border-warning text-center" style= {{width: "1000px"}}>
                <thead>
                  <tr>
                    <th colSpan="6">
                      <h5 className="text-start">Total transaction- {totalTransaction}</h5>
                    </th>
                  </tr>
                  <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    if(perPageTransactions !== undefined) {
                      return perPageTransactions.map((transaction, ind) => {
                        return(
                          <tr key={transaction._id}>
                            <td>{ind+1}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>
                              <div className="d-inline">
                                <Button 
                                  variant="warning"
                                  className="px-4" 
                                  onClick={() => this.openTransactionEditModal(transaction._id)}
                                >Edit</Button>
                                {
                                  this.state.editAbleTransactionId === transaction._id ?    <EditTransactionModal 
                                    isShow = { this.state.editTransactionModal }
                                    isHide = { this.closeTransactionEditModal }
                                    currentTransactionInfo = { transaction }
                                  /> : null
                                }
                                <button 
                                  type="button" 
                                  className="btn btn-danger px-3 ms-2"
                                  onClick={ () => this.deleteTransaction(transaction._id) }
                                >Delete</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }else {
                      return (
                        <tr>
                          <td colSpan="6" className="h5">Transactions empty</td>
                        </tr>
                      )
                    }
                  })()}
                </tbody>
              </table>
            </div>
            <Pagination 
              currentpage = { currentpage }
              transactionsPerPage={transactionsPerPage} 
              totaltransactions={allTransactions.length} 
              paginationHandler= {this.paginateClickHandler}
              previousPage={this.previousPage}
              nextPage={this.nextPage}
            />
          </div>
          <div className="col-4">
            <div className="card">
              {(() => {
                if (userInfo !== undefined) {
                  return (
                    <div className="card-body">
                      <p className='mb-2'>Search by type, date</p>
                      <input 
                        className="form-control me-2 mb-2" 
                        type="search"
                        name='term' 
                        placeholder='Expense/Income/01-01-1999'
                        onChange={this.searchChangeHandler}
                      />
                      <h5 className="card-title">Name: {userInfo.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Email: {userInfo.email}</h6>
                      <p className={userInfo.income !== 0 ? "card-text text-secondary fw-bolder my-1": "card-text text-danger fw-bolder my-1"}>Income: {userInfo.income} BDT</p>
                      <p className="card-text text-warning fw-bolder my-1">Expense: {userInfo.expense} BDT</p>
                      <p className={userInfo.netBalance < userInfo.expense ? "card-text text-danger fw-bolder": "card-text text-success fw-bolder"}>Net balance: {userInfo.netBalance} BDT</p>
                      <Button 
                        variant="secondary" 
                        onClick={this.openTransactionCreateModal}
                      >Create a transaction</Button>
                      <CreateTransactionModal 
                        isShow = { this.state.transactionCreateModal }
                        isHide = { this.closeTransactionCreateModal }
                      />
                    </div>
                  )
                }else {
                  return(
                    <div className="card-body">
                      <Button 
                        variant="secondary" 
                        onClick={this.openTransactionCreateModal}
                      >Create a transaction</Button>
                      <CreateTransactionModal 
                        isShow = { this.state.transactionCreateModal }
                        isHide = { this.closeTransactionCreateModal }
                      />
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allTransactions: state.allTransactions.transactions,
    totalTransaction: state.allTransactions.totalTransaction,
    userInfo: state.allTransactions.userInfo,
    deletedTransactionId: state.deleteTransaction.deletedTransactionId,
    deleteSuccessMsg: state.deleteTransaction.deleteSuccessMsg,
    deleteErrorMsg: state.deleteTransaction.deleteErrorMsg,
    updateTransaction: state.editTransaction.updatedTransaction
  }
}
export default connect(mapStateToProps, {allTransactionAction, deleteTransactionAction, editTransactionAction, searchResultAction})(Dashboard);