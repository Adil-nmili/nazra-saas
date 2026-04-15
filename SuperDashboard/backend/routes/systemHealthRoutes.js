const express = require('express');
const router = express.Router();
const {
  getSystemHealth,
  getPerformanceHistory,
  getRecentIncidents,
} = require('../controllers/systemHealthController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// System health routes
router.get('/', getSystemHealth);
router.get('/performance', getPerformanceHistory);
router.get('/incidents', getRecentIncidents);

module.exports = router;
