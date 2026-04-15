const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getSubscriptions,
  getMySubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getSubscriptionStats,
} = require('../controllers/subscriptionController');

// All routes require authentication
router.use(protect);

router.get('/me', getMySubscription);
router.post('/', createSubscription);
router.put('/:id/cancel', cancelSubscription);

// Admin only routes
router.get('/', authorize('admin', 'superadmin'), getSubscriptions);
router.get('/stats', authorize('admin', 'superadmin'), getSubscriptionStats);
router.put('/:id', authorize('admin', 'superadmin'), updateSubscription);

module.exports = router;
