const {
  getCart,
  createCart,
  deleteCart,
  updateCart,
  deleteAllCart
} = require('../../../services/mongoose/cart');

const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await getCart(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const create = async (req, res, next) => {
  try {
    const result = await createCart(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const result = await deleteCart(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCart(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (req, res, next) => {
  try {
    const result = await deleteAllCart(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  deleteOne,
  deleteAll
};
