const express = require('express');
const router = express.Router();
const {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
  getMoodStats
} = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getJournals)
  .post(protect, createJournal);

router.get('/stats/mood', protect, getMoodStats);

router.route('/:id')
  .get(protect, getJournal)
  .put(protect, updateJournal)
  .delete(protect, deleteJournal);

module.exports = router;