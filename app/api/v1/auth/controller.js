const { signin, createAdmin } = require('../../../services/mongoose/auth');

const { StatusCodes } = require('http-status-codes');

const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createAdminCms = async (req, res, next) => {
  try {
    const result = await createAdmin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signinCms, createAdminCms };
