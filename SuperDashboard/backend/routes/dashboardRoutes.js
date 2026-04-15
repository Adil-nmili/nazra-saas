const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getDashboardStats,
  getRevenueChart,
} = require('../controllers/dashboardController');

// All routes require authentication
router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/revenue-chart', getRevenueChart);

module.exports = router;
