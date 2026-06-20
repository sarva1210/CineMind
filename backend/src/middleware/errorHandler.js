const { sendError } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.log("========== ERROR ==========");
  console.log(err);
  console.log("Message:", err.message);
  console.log("Response:", err.response?.data);
  console.log("==========================");

  return sendError(
    res,
    err.statusCode || 500,
    err.message || "Internal Server Error"
  );
};

module.exports = errorHandler;