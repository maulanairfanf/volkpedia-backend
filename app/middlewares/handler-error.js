const { StatusCodes } = require("http-status-codes");
const errorHandleMiddleware = (err, req, res, next) => {
  console.log("error", err.message);
  let costumError = {
    statusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    costumError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    costumError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    costumError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    costumError.statusCode = 400;
  }

  if (err.name === "CastError") {
    costumError.msg = `No item found with id : ${err.value}`;
    costumError.statusCode = 404;
  }

  return res.status(costumError.statusCodes).json({ msg: costumError.msg });
};

module.exports = errorHandleMiddleware;
