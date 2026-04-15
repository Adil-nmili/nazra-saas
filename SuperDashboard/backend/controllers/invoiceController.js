const Invoice = require('../models/Invoice');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
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

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.issueDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const total = await Invoice.countDocuments(query);
    const invoices = await Invoice.find(query)
      .populate('client', 'name email company')
      .populate('createdBy', 'name email')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('client', 'name email company address phone')
      .populate('createdBy', 'name email');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    // Calculate totals
    if (req.body.items && req.body.items.length > 0) {
      req.body.subtotal = req.body.items.reduce((sum, item) => sum + item.amount, 0);
      req.body.tax = req.body.subtotal * (req.body.taxRate || 0) / 100;
      req.body.total = req.body.subtotal + req.body.tax - (req.body.discount || 0);
    }

    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = async (req, res) => {
  try {
    // Recalculate totals if items changed
    if (req.body.items && req.body.items.length > 0) {
      req.body.subtotal = req.body.items.reduce((sum, item) => sum + item.amount, 0);
      req.body.tax = req.body.subtotal * (req.body.taxRate || 0) / 100;
      req.body.total = req.body.subtotal + req.body.tax - (req.body.discount || 0);
    }

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    await invoice.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark invoice as paid
// @route   PUT /api/invoices/:id/pay
// @access  Private
const markAsPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    invoice.status = 'paid';
    invoice.paidDate = Date.now();
    await invoice.save();

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get invoice statistics
// @route   GET /api/invoices/stats
// @access  Private
const getInvoiceStats = async (req, res) => {
  try {
    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ status: 'paid' });
    const pendingInvoices = await Invoice.countDocuments({ status: 'pending' });
    const overdueInvoices = await Invoice.countDocuments({ status: 'overdue' });

    const revenue = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const pendingAmount = await Invoice.aggregate([
      { $match: { status: { $in: ['pending', 'sent'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalInvoices,
        paid: paidInvoices,
        pending: pendingInvoices,
        overdue: overdueInvoices,
        revenue: revenue[0]?.total || 0,
        pendingAmount: pendingAmount[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  markAsPaid,
  getInvoiceStats,
};
