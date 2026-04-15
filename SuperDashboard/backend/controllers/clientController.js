const Client = require('../models/Client');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
const getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};

    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Filter by segment
    if (req.query.segment) {
      query.segment = req.query.segment;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await Client.countDocuments(query);
    const clients = await Client.find(query)
      .populate('createdBy', 'name email')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: clients,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('createdBy', 'name email');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
const createClient = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const client = await Client.create(req.body);

    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get client statistics
// @route   GET /api/clients/stats
// @access  Private
const getClientStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const activeClients = await Client.countDocuments({ status: 'active' });
    const segmentStats = await Client.aggregate([
      {
        $group: {
          _id: '$segment',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalClients,
        active: activeClients,
        segments: segmentStats,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
};
