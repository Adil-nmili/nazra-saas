const Subscription = require('../models/Subscription');

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Private/Admin
const getSubscriptions = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await Subscription.countDocuments(query);
    const subscriptions = await Subscription.find(query)
      .populate('user', 'name email')
      .populate('plan', 'name price billingCycle')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's subscription
// @route   GET /api/subscriptions/me
// @access  Private
const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id })
      .populate('plan')
      .sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create subscription
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = async (req, res) => {
  try {
    req.body.user = req.user.id;

    // Check for existing active subscription
    const existingSubscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active',
    });

    if (existingSubscription) {
      return res.status(400).json({
        message: 'User already has an active subscription',
      });
    }

    const subscription = await Subscription.create(req.body);

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Private
const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel subscription
// @route   PUT /api/subscriptions/:id/cancel
// @access  Private
const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = 'cancelled';
    subscription.autoRenew = false;
    await subscription.save();

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get subscription statistics
// @route   GET /api/subscriptions/stats
// @access  Private/Admin
const getSubscriptionStats = async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const cancelledSubscriptions = await Subscription.countDocuments({ status: 'cancelled' });

    const subscriptionsByPlan = await Subscription.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$plan',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'plans',
          localField: '_id',
          foreignField: '_id',
          as: 'planInfo',
        },
      },
      {
        $unwind: '$planInfo',
      },
      {
        $project: {
          _id: 1,
          count: 1,
          planName: '$planInfo.name',
          planPrice: '$planInfo.price',
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalSubscriptions,
        active: activeSubscriptions,
        cancelled: cancelledSubscriptions,
        byPlan: subscriptionsByPlan,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubscriptions,
  getMySubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getSubscriptionStats,
};
