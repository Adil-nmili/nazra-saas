const Invoice = require('../models/Invoice');
const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Subscription = require('../models/Subscription');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalClients = await Client.countDocuments();
    const activeClients = await Client.countDocuments({ status: 'active' });
    const totalInvoices = await Invoice.countDocuments();
    const pendingInvoices = await Invoice.countDocuments({ status: { $in: ['pending', 'sent'] } });
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });

    // Get revenue
    const revenue = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    // Get pending amount
    const pendingAmount = await Invoice.aggregate([
      { $match: { status: { $in: ['pending', 'sent'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    // Get monthly revenue for current year
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = await Invoice.aggregate([
      {
        $match: {
          status: 'paid',
          paidDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$paidDate' },
          total: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get recent activity
    const recentInvoices = await Invoice.find()
      .populate('client', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentSales = await Sale.find()
      .populate('client', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        clients: {
          total: totalClients,
          active: activeClients,
        },
        invoices: {
          total: totalInvoices,
          pending: pendingInvoices,
        },
        subscriptions: {
          active: activeSubscriptions,
        },
        revenue: {
          total: revenue[0]?.total || 0,
          pending: pendingAmount[0]?.total || 0,
          monthly: monthlyRevenue,
        },
        recent: {
          invoices: recentInvoices,
          sales: recentSales,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get revenue chart data
// @route   GET /api/dashboard/revenue-chart
// @access  Private
const getRevenueChart = async (req, res) => {
  try {
    const { period = 'monthly', year = new Date().getFullYear() } = req.query;

    let groupBy;
    let dateField = '$paidDate';

    if (period === 'daily') {
      groupBy = { $dayOfMonth: dateField };
    } else if (period === 'weekly') {
      groupBy = { $week: dateField };
    } else {
      groupBy = { $month: dateField };
    }

    const chartData = await Invoice.aggregate([
      {
        $match: {
          status: 'paid',
          paidDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: groupBy,
          revenue: { $sum: '$total' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRevenueChart,
};
