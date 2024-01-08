const {
  getDashboard
} = require('../../../services/mongoose/dashboard');

const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await getDashboard(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index
};
