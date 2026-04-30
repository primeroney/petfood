const express = require('express');
const {
  listSubscribers,
  subscribe,
  unsubscribe
} = require('../controllers/newsletterController');

const router = express.Router();

router.route('/newsletter').get(listSubscribers).post(subscribe);
router.delete('/newsletter/:email', unsubscribe);

module.exports = router;
