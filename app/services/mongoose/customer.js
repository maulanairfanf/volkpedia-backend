const Customer = require('../../api/v1/customer/model');

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createTokenCustomer, createJWT } = require('../../utils');

const { otpMail, invoiceMail } = require('../mail');

const signupCustomer = async (req) => {
  const { fullName, email, password } = req.body;

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
  const result = await Customer.findOne({ _id: req.customer.id })
  delete result._doc.password;
  delete result._doc.otp;

  return result
}

const getAllCustomer = async (req) => {
  const result = await Customer.find().select('_id fullName email createdAt updatedAt')

  return result;
};

// const getOneEvent = async (req) => {
//   const { id } = req.params;
//   const result = await Events.findOne({ _id: id })
//     .populate('category')
//     .populate({ path: 'talent', populate: 'image' })
//     .populate('image');

//   if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

//   return result;
// };

// const getAllOrders = async (req) => {
//   console.log(req.customer);
//   const result = await Orders.find({ customer: req.customer.id });
//   return result;
// };

/**
 * Tugas Send email invoice
 * TODO: Ambil data email dari personal detail
 *  */
// const checkoutOrder = async (req) => {
//   const { event, personalDetail, payment, tickets } = req.body;

//   const checkingEvent = await Events.findOne({ _id: event });
//   if (!checkingEvent) {
//     throw new NotFoundError('Tidak ada acara dengan id : ' + event);
//   }

//   const checkingPayment = await Payments.findOne({ _id: payment });

//   if (!checkingPayment) {
//     throw new NotFoundError(
//       'Tidak ada metode pembayaran dengan id :' + payment
//     );
//   }

//   let totalPay = 0,
//     totalOrderTicket = 0;
//   await tickets.forEach((tic) => {
//     checkingEvent.tickets.forEach((ticket) => {
//       if (tic.ticketCategories.type === ticket.type) {
//         if (tic.sumTicket > ticket.stock) {
//           throw new NotFoundError('Stock event tidak mencukupi');
//         } else {
//           ticket.stock -= tic.sumTicket;

//           totalOrderTicket += tic.sumTicket;
//           totalPay += tic.ticketCategories.price * tic.sumTicket;
//         }
//       }
//     });
//   });

//   await checkingEvent.save();

//   const historyEvent = {
//     title: checkingEvent.title,
//     date: checkingEvent.date,
//     about: checkingEvent.about,
//     tagline: checkingEvent.tagline,
//     keyPoint: checkingEvent.keyPoint,
//     venueName: checkingEvent.venueName,
//     tickets: tickets,
//     image: checkingEvent.image,
//     category: checkingEvent.category,
//     talent: checkingEvent.talent,
//     organizer: checkingEvent.organizer,
//   };

//   const result = new Orders({
//     date: new Date(),
//     personalDetail: personalDetail,
//     totalPay,
//     totalOrderTicket,
//     orderItems: tickets,
//     customer: req.customer.id,
//     event,
//     historyEvent,
//     payment,
//   });

//   await result.save();
//   await invoiceMail(personalDetail.email, result)
//   return result;
// };

// const getAllPaymentByOrganizer = async (req) => {
//   const { organizer } = req.params;

//   const result = await Payments.find({ organizer: organizer });

//   return result;
// };

module.exports = {
  signupCustomer,
  activateCustomer,
  signinCustomer,
  getProfileCustomer,
  getAllCustomer
  // getAllEvents,
  // getOneEvent,
  // getAllOrders,
  // checkoutOrder,
  // getAllPaymentByOrganizer,
};
