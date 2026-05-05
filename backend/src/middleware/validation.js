const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

const validators = {
  // Auth validators
  register: [
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('username')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be 3-20 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain uppercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain number'),
  ],

  login: [
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],

  // Rating validators
  submitRating: [
    body('movieId').isNumeric().withMessage('Movie ID must be numeric'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('review')
      .optional()
      .isLength({ max: 1000 })
      .withMessage('Review must not exceed 1000 characters'),
    body('spoiler').optional().isBoolean().withMessage('Spoiler must be boolean'),
  ],

  // Watchlist validators
  addToWatchlist: [
    body('movieId').isNumeric().withMessage('Movie ID must be numeric'),
    body('status')
      .isIn(['want-to-watch', 'watching', 'watched'])
      .withMessage('Invalid status'),
    body('priority')
      .optional()
      .isInt({ min: 0, max: 10 })
      .withMessage('Priority must be 0-10'),
    body('notes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Notes must not exceed 500 characters'),
  ],

  // Social validators
  followUser: [
    param('userId').isMongoId().withMessage('Invalid user ID'),
  ],

  // User profile validators
  updateProfile: [
    body('username')
      .optional()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be 3-20 characters'),
    body('bio')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Bio must not exceed 500 characters'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),
  ],

  // Search/Query validators
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be at least 1'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be 1-100'),
  ],
};

module.exports = { validators, handleValidationErrors };
