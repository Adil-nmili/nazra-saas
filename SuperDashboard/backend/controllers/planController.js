const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single plan
// @route   GET /api/plans/:id
// @access  Public
const getPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private/Admin
const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Check if any active subscriptions use this plan
    const activeSubscriptions = await Subscription.countDocuments({
      plan: req.params.id,
      status: 'active',
    });

    if (activeSubscriptions > 0) {
      return res.status(400).json({
        message: 'Cannot delete plan with active subscriptions',
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
};
