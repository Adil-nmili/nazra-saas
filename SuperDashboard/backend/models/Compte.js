const mongoose = require('mongoose');

const compteSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: [true, 'Please add an account number'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add an account name'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['checking', 'savings', 'business', 'investment'],
      default: 'checking',
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'frozen', 'closed'],
      default: 'active',
    },
    openedDate: {
      type: Date,
      default: Date.now,
    },
    lastTransaction: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate account number before saving
compteSchema.pre('save', async function (next) {
  if (!this.accountNumber) {
    this.accountNumber = 'ACC' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Compte', compteSchema);
