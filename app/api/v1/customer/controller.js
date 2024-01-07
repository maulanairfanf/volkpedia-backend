const {
  signupCustomer,
  activateCustomer,
  signinCustomer,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getAllPaymentByOrganizer,
  getProfileCustomer,
  getAllCustomer
} = require('../../../services/mongoose/customer');

const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
  try {
    const result = await signupCustomer(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activeCustomer = async (req, res, next) => {
  try {
    const result = await activateCustomer(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinCustomer(req);

    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const result = await getProfileCustomer(req);

    res.status(StatusCodes.OK).json({
      data: { data: result },
    });
  } catch (err) {
    next(err);
  }
};



const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPayment = async (req, res, next) => {
  try {
    const result = await getAllPaymentByOrganizer(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getCustomer = async (req, res,next) => {
  try {
    const result = await getAllCustomer(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  activeCustomer,
  signin,
  getProfile,
  getCustomer
  // getAllLandingPage,
  // getDetailLandingPage,
  // getDashboard,
  // checkout,
  // getAllPayment,
};
