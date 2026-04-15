const Company = require('../models/Company');

// @desc    Get company info
// @route   GET /api/company
// @access  Private
const getCompany = async (req, res) => {
  try {
    const company = await Company.findOne();

    if (!company) {
      return res.status(404).json({ message: 'Company information not found' });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update company info
// @route   POST /api/company
// @access  Private/Admin
const upsertCompany = async (req, res) => {
  try {
    let company = await Company.findOne();

    if (company) {
      // Update existing
      company = await Company.findByIdAndUpdate(company._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      // Create new
      company = await Company.create(req.body);
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update company info
// @route   PUT /api/company
// @access  Private/Admin
const updateCompany = async (req, res) => {
  try {
    let company = await Company.findOne();

    if (!company) {
      return res.status(404).json({ message: 'Company information not found' });
    }

    company = await Company.findByIdAndUpdate(company._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompany,
  upsertCompany,
  updateCompany,
};
