const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

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
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = UserReview;
