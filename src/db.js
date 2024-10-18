// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Environment variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

// Initialize Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false, // Disable logging during tests
});

// Connect to the database
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDatabase(); // Connect the DB

module.exports = sequelize;

// Import all models here to register them with Sequelize
const User = require('./models/User'); // Import User model
const UserReview = require('./models/UserReview'); // Import UserReview model

// Sync database - This will create the necessary tables based on model definitions
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
sequelize.sync({ force: isDevelopment, alter: isDevelopment}).then(() => {
  console.log('Database & tables synced!');
}).catch((err) => {
  console.error('Error synchronizing the database:', err);
});

module.exports = sequelize;