const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

const isDevEnv = process.env.NODE_ENV === 'development';

if (process.env.NODE_ENV === 'test') {
  // Use an in-memory SQLite database for testing
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
} else {
  // Use the real database credentials for development/production
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false,
  });

  async function connectDatabase() {
    try {
      await sequelize.authenticate();
      // console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  connectDatabase(); // Connect the DB

  const User = require('./models/User'); // Import User model
  const UserReview = require('./models/UserReview'); // Import UserReview model

  sequelize.sync({ force: isDevEnv, alter: isDevEnv }).then(() => {
    // console.log('Database & tables synced!');
  }).catch((err) => {
    console.error('Error synchronizing the database:', err);
  });
}

module.exports = sequelize;