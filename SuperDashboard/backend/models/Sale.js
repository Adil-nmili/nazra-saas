const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    saleNumber: {
      type: String,
      unique: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'credit_card', 'bank_transfer', 'check', 'other'],
      default: 'bank_transfer',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'refunded', 'cancelled'],
      default: 'pending',
    },
    description: {
      type: String,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Generate sale number before saving
saleSchema.pre('save', async function (next) {
  if (!this.saleNumber) {
    const count = await this.constructor.countDocuments();
    this.saleNumber = `SALE-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Sale', saleSchema);
