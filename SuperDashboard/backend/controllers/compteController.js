const Compte = require('../models/Compte');

// @desc    Get all comptes
// @route   GET /api/comptes
// @access  Private
const getComptes = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by client
    if (req.query.client) {
      query.client = req.query.client;
    }

    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await Compte.countDocuments(query);
    const comptes = await Compte.find(query)
      .populate('client', 'name email')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comptes.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: comptes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single compte
// @route   GET /api/comptes/:id
// @access  Private
const getCompte = async (req, res) => {
  try {
    const compte = await Compte.findById(req.params.id).populate('client', 'name email');

    if (!compte) {
      return res.status(404).json({ message: 'Compte not found' });
    }

    res.status(200).json({
      success: true,
      data: compte,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new compte
// @route   POST /api/comptes
// @access  Private
const createCompte = async (req, res) => {
  try {
    const compte = await Compte.create(req.body);

    res.status(201).json({
      success: true,
      data: compte,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update compte
// @route   PUT /api/comptes/:id
// @access  Private
const updateCompte = async (req, res) => {
  try {
    const compte = await Compte.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!compte) {
      return res.status(404).json({ message: 'Compte not found' });
    }

    res.status(200).json({
      success: true,
      data: compte,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete compte
// @route   DELETE /api/comptes/:id
// @access  Private
const deleteCompte = async (req, res) => {
  try {
    const compte = await Compte.findById(req.params.id);

    if (!compte) {
      return res.status(404).json({ message: 'Compte not found' });
    }

    await compte.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get compte statistics
// @route   GET /api/comptes/stats
// @access  Private
const getCompteStats = async (req, res) => {
  try {
    const totalComptes = await Compte.countDocuments();
    const totalBalance = await Compte.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$balance' },
        },
      },
    ]);

    const typeStats = await Compte.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalBalance: { $sum: '$balance' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalComptes,
        totalBalance: totalBalance[0]?.total || 0,
        byType: typeStats,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getComptes,
  getCompte,
  createCompte,
  updateCompte,
  deleteCompte,
  getCompteStats,
};
