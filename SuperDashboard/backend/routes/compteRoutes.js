const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getComptes,
  getCompte,
  createCompte,
  updateCompte,
  deleteCompte,
  getCompteStats,
} = require('../controllers/compteController');

// All routes require authentication
router.use(protect);

router.get('/stats', getCompteStats);

router.route('/')
  .get(getComptes)
  .post(createCompte);

router.route('/:id')
  .get(getCompte)
  .put(updateCompte)
  .delete(deleteCompte);

module.exports = router;
