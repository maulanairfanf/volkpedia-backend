const {
  getProduct,
  getProductDetail,
  createProduct
} = require('../../../services/mongoose/product');

const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await getProduct(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getProductDetail(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const create = async (req, res, next) => {
  try {
    const result = await createProduct(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  find,
  create
};
