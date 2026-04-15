const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a plan name'],
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly', 'one-time'],
      default: 'monthly',
    },
    features: [{
      type: String,
    }],
    maxUsers: {
      type: Number,
      default: 1,
    },
    maxStorage: {
      type: Number, // in GB
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tier: {
      type: String,
      enum: ['free', 'basic', 'professional', 'enterprise'],
      default: 'basic',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Plan', planSchema);
