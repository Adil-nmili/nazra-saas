const Sale = require('../models/Sale');

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
const getSales = async (req, res) => {
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

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by payment method
    if (req.query.paymentMethod) {
      query.paymentMethod = req.query.paymentMethod;
    }

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.saleDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const total = await Sale.countDocuments(query);
    const sales = await Sale.find(query)
      .populate('client', 'name email')
      .populate('invoice', 'invoiceNumber')
      .populate('processedBy', 'name email')
      .skip(startIndex)
      .limit(limit)
      .sort({ saleDate: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: sales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single sale
// @route   GET /api/sales/:id
// @access  Private
const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('client', 'name email company')
      .populate('invoice')
      .populate('processedBy', 'name email');

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({
      success: true,
      data: sale,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new sale
// @route   POST /api/sales
// @access  Private
const createSale = async (req, res) => {
  try {
    req.body.processedBy = req.user.id;
    const sale = await Sale.create(req.body);

    res.status(201).json({
      success: true,
      data: sale,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update sale
// @route   PUT /api/sales/:id
// @access  Private
const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({
      success: true,
      data: sale,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete sale
// @route   DELETE /api/sales/:id
// @access  Private
const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await sale.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get sales statistics
// @route   GET /api/sales/stats
// @access  Private
const getSalesStats = async (req, res) => {
  try {
    const totalSales = await Sale.countDocuments();
    const completedSales = await Sale.countDocuments({ status: 'completed' });

    const totalRevenue = await Sale.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Monthly sales for the current year
    const currentYear = new Date().getFullYear();
    const monthlySales = await Sale.aggregate([
      {
        $match: {
          status: 'completed',
          saleDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$saleDate' },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Sales by payment method
    const salesByMethod = await Sale.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$paymentMethod',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalSales,
        completed: completedSales,
        revenue: totalRevenue[0]?.total || 0,
        monthlySales,
        byPaymentMethod: salesByMethod,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  getSalesStats,
};
