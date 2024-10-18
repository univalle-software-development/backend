const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Make sure this points to your Sequelize instance
const User = require('./User'); // Import User model for foreign key reference

const UserReview = sequelize.define('UserReview', {
  movie_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  review_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review_comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Reference to the User model
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = UserReview;
