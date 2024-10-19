// // userControllerUnit.test.js
// const { addUser } = require('../src/controllers/userController');
// const User = require('../src/models/User'); // Sequelize model

// // Mock the Sequelize User model
// jest.mock('../src/models/User', () => {
//   return {
//     create: jest.fn(), // Mock the create method
//   };
// });

// describe('User Controller - Add User', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear previous mocks before each test
//   });

//   it('should add a new user successfully', async () => {
//     // Arrange: Mock the create method to return the user
//     const req = {
//       body: {
//         username: 'testUser',
//         password: 'password123'
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     User.create.mockResolvedValue(req.body); // Mock successful user creation

//     // Act: Call the addUser controller function
//     await addUser(req, res);

//     // Assert: Check the response and status code
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(req.body);
//   });

//   it('should handle error if adding a user fails', async () => {
//     // Arrange: Mock the create method to throw an error
//     const req = {
//       body: {
//         username: 'testUser',
//         password: 'password123'
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     User.create.mockRejectedValue(new Error('Failed to add user')); // Mock failure

//     // Act
//     await addUser(req, res);

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Error adding user' });
//   });
// });
