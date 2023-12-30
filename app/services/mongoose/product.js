const Product = require('../../api/v1/product/model');


const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createTokenCustomer, createJWT } = require('../../utils');

const { otpMail, invoiceMail } = require('../mail');


const signinCustomer = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Customer.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  if (result.status === 'tidak aktif') {
    throw new UnauthorizedError('Akun anda belum aktif');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenCustomer(result) });

  return token;
};

const getProductDetail = async (req) => {
  const result = await Product.findOne({ _id: req.params.id })

  return result
}

const getProduct = async (req) => {
  const result = await Product.find()

  return result
}

const createProduct = async (req) => {
  // const { name, description, stock } = req.body
  const result = await Product.create(req.body)

  return result
}



module.exports = {
  getProduct,
  getProductDetail,
  createProduct
};
