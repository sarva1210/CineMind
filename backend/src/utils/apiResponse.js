// API Response Utility
const apiResponse = (statusCode, data, message = '', success = true) => {
  return {
    statusCode,
    data,
    message,
    success,
  };
};

// Success Response
const sendSuccess = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    data,
    message,
  });
};

// Error Response
const sendError = (res, statusCode, message = 'Error', data = null) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data,
  });
};

module.exports = {
  apiResponse,
  sendSuccess,
  sendError,
};
