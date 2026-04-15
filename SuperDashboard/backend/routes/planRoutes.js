const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/planController');

// Public routes
router.get('/', getPlans);
router.get('/:id', getPlan);

// Admin only routes
router.post('/', protect, authorize('admin', 'superadmin'), createPlan);
router.put('/:id', protect, authorize('admin', 'superadmin'), updatePlan);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deletePlan);

module.exports = router;
