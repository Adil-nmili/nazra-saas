const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  markAsPaid,
  getInvoiceStats,
} = require('../controllers/invoiceController');

// All routes require authentication
router.use(protect);

router.get('/stats', getInvoiceStats);

router.route('/')
  .get(getInvoices)
  .post(createInvoice);

router.route('/:id')
  .get(getInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);

router.put('/:id/pay', markAsPaid);

module.exports = router;
