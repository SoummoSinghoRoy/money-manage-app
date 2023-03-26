const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  income: Number,
  expense: Number,
  netBalance: Number,
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ],
}, {
  timestamps: true
})

const User = model('User', UserSchema);

module.exports = User;

