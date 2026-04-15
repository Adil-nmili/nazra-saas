const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  getSalesStats,
} = require('../controllers/saleController');

// All routes require authentication
router.use(protect);

router.get('/stats', getSalesStats);

router.route('/')
  .get(getSales)
  .post(createSale);

router.route('/:id')
  .get(getSale)
  .put(updateSale)
  .delete(deleteSale);

module.exports = router;
