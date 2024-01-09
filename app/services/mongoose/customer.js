const Customer = require('../../api/v1/customer/model');
const Cart = require('../../api/v1/cart/model');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createTokenCustomer, createJWT } = require('../../utils');

const { otpMail, invoiceMail } = require('../mail');

const signupCustomer = async (req) => {
  const { fullName, email, password } = req.body;

  const isActive = await Customer.findOne({
    email,
    status: 'aktif',
  });

  if (isActive) throw new BadRequestError('Already registered'); 

  // jika email dan status tidak aktif
  let result = await Customer.findOne({
    email,
    status: 'tidak aktif',
  });

  if (result) {
    result.fullName = fullName;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Customer.create({
      fullName,
      email,
      password,
      otp: Math.floor(Math.random() * 9999),
    });
  }
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateCustomer = async (req) => {
  const { otp, email } = req.body;
  const check = await Customer.findOne({
    email,
  });

  if (!check) throw new NotFoundError('Partisipan belum terdaftar');

  if (check && check.otp !== otp) throw new BadRequestError('Kode otp salah');

  const result = await Customer.findByIdAndUpdate(
    check._id,
    {
      status: 'aktif',
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

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

const getProfileCustomer = async (req) => {
  const customer = await Customer.findOne({ _id: req.customer.id })
  const countCart = await Cart.findOne({ customer: req.customer.id })
  delete customer._doc.password;
  delete customer._doc.otp;

  let resultCart = {}
  if (countCart) {
    resultCart = {
      countCart: countCart.products.length
    }
  }

  const result= {
    ...customer._doc,
    ...resultCart
  };

  return result
}

const getAllCustomer = async (req) => {
  const { query, limit = 10, page = 1 } = req.query;
  let condition = {}

  if (query) {
    condition = { ...condition, fullName: { $regex: query, $options: 'i' } };
  }

  const result = await Customer.find(condition)
  .limit(limit)
  .skip(limit * (page - 1))
  .select('_id fullName email status otp createdAt updatedAt')
  .sort({createdAt: -1})

  const count = await Customer.countDocuments(condition);


  return { data: result, pages: Math.ceil(count / limit), total: count }
};

const updateStatusCustomer = async (req) => {
  const { status } = req.body;
  const check = Customer.findOne({_id: req.params.id})
  if (!['aktif', 'tidak aktif'].includes(status)) {
    throw new BadRequestError('Status mus be aktif atau tidak aktif');
  }
  if (!check) throw new NotFoundError('Not Found')

  const result = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      status: status,
    },
    { new: true }
  )

  delete result._doc.password;

  return result;
};

module.exports = {
  signupCustomer,
  activateCustomer,
  signinCustomer,
  getProfileCustomer,
  getAllCustomer,
  updateStatusCustomer
};
