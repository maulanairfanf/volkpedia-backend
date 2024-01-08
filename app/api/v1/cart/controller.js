const {
  getCart,
  createCart,
  deleteCart,
  updateCart,
  deleteAllCart,
  deleteOneByUser,
  deleteProductCart,
  getAllCart
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

const deleteUserCart = async (req, res, next) => {
  try {
    const result = await deleteOneByUser(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProductCartUser = async (req, res, next) => {
  try {
    const result = await deleteProductCart(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    console.log('error', error)
    next(err)
  }
}

const getAll = async (req, res, next) => {
  try {
    const result = await getAllCart(req);

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
  deleteAll,
  deleteUserCart,
  deleteProductCartUser,
  getAll
};
