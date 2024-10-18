// jest.setup.js
const sequelize = require('./src/db'); // Point to your Sequelize instance

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Force recreate tables for each test run
});

afterAll(async () => {
  await sequelize.close(); // Close Sequelize connection after all tests
});
