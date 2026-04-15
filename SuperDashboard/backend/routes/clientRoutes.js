const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
} = require('../controllers/clientController');

// All routes require authentication
router.use(protect);

router.get('/stats', getClientStats);

router.route('/')
  .get(getClients)
  .post(createClient);

router.route('/:id')
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient);

module.exports = router;
