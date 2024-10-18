const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Make sure this points to your Sequelize instance

const User = sequelize.define('User', {
  // Define model attributes
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Model options
  timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = User;
