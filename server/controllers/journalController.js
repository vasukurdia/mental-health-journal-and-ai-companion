const Journal = require('../models/Journal');

// @desc    Get all journals for user
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: journals.length,
      data: journals
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single journal
// @route   GET /api/journals/:id
// @access  Private
const getJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Make sure user owns journal
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new journal
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.body;

    const journal = await Journal.create({
      user: req.user._id,
      title,
      content,
      mood,
      tags: tags || [],
      isPrivate: isPrivate !== undefined ? isPrivate : true
    });

    res.status(201).json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update journal
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = async (req, res) => {
  try {
    let journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Make sure user owns journal
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    journal = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete journal
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Make sure user owns journal
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await journal.deleteOne();

    res.json({
      success: true,
      message: 'Journal deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mood statistics
// @route   GET /api/journals/stats/mood
// @access  Private
const getMoodStats = async (req, res) => {
  try {
    const stats = await Journal.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$mood', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
  getMoodStats
};