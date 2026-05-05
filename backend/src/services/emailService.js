const nodemailer = require('nodemailer');

// Configure email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailService = {
  // Send welcome email
  async sendWelcomeEmail(email, username) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@cinemind.com',
        to: email,
        subject: 'Welcome to CineMind!',
        html: `
          <h2>Welcome to CineMind, ${username}!</h2>
          <p>Your movie journey has begun. Explore thousands of movies, rate them, and connect with other movie lovers.</p>
          <p><a href="${process.env.FRONTEND_URL}/profile">Complete Your Profile</a></p>
        `,
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  },

  // Send new movie release notification
  async sendReleaseNotification(email, movieTitle, releaseDate) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@cinemind.com',
        to: email,
        subject: `${movieTitle} is Now Available!`,
        html: `
          <h2>New Release Alert!</h2>
          <p><strong>${movieTitle}</strong> has been released on ${releaseDate}.</p>
          <p><a href="${process.env.FRONTEND_URL}">Watch Now</a></p>
        `,
      });
    } catch (error) {
      console.error('Error sending release notification:', error);
    }
  },

  // Send follow notification
  async sendFollowNotification(email, followerName) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@cinemind.com',
        to: email,
        subject: `${followerName} started following you!`,
        html: `
          <h2>New Follower!</h2>
          <p><strong>${followerName}</strong> started following you.</p>
          <p><a href="${process.env.FRONTEND_URL}">View Profile</a></p>
        `,
      });
    } catch (error) {
      console.error('Error sending follow notification:', error);
    }
  },

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@cinemind.com',
        to: email,
        subject: 'Password Reset - CineMind',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the link below to reset your password.</p>
          <p><a href="${resetUrl}">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  },
};

module.exports = emailService;
