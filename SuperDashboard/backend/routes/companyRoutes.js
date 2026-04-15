const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getCompany,
  upsertCompany,
  updateCompany,
} = require('../controllers/companyController');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getCompany)
  .post(authorize('admin', 'superadmin'), upsertCompany)
  .put(authorize('admin', 'superadmin'), updateCompany);

module.exports = router;
