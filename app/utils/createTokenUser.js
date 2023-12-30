const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    email: user.email,
    organizer: user.organizer,
  };
};

const createTokenCustomer = (customer) => {
  return {
    customerId: customer._id,
    fullName: customer.fullName,
    email: customer.email,
  };
};

module.exports = { createTokenUser, createTokenCustomer };
