const jwt = require('jsonwebtoken');
const User = require('../user/userModel');
const { sendSuccess, sendError } = require('../../utils/apiResponse');

// Register User
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return sendError(res, 400, 'Please provide all required fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, 400, 'User already exists with this email');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return sendSuccess(
      res,
      201,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      'User registered successfully'
    );
  } catch (error) {
    next(error);
  }
};

// Login User
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendError(res, 400, 'Please provide email and password');
    }

    // Check if user exists with password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return sendSuccess(
      res,
      200,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, };