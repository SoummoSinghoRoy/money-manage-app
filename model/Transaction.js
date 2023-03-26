const {Schema, model} = require('mongoose');
const moment = require('moment');

const TransactionSchema = new Schema({
  transactionType: {
    type: String,
    required: true,
    set: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true,
    set: (value) => moment(value).format('DD-MM-YYYY'),
    get: (value) => moment(value).format('DD-MM-YYYY')
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

TransactionSchema.index({
  transactionType: 'text',
}, {
  weights: {
    transactionType: 5,
  }
})

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction;