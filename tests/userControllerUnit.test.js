const { addUser } = require('../src/controllers/userController');
const User = require('../src/models/User');

jest.mock('../src/models/User', () => ({
  create: jest.fn(),
}));

describe('User Controller - Add User', () => {
  let consoleLogSpy, consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should add a new user successfully', async () => {
    const req = {
      body: {
        username: 'testUser',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.create.mockResolvedValue(req.body);

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
    expect(consoleLogSpy).toHaveBeenCalledWith('addUser: Creating user...');
    expect(consoleLogSpy).toHaveBeenCalledWith('addUser: User created successfully', req.body);
  });

  it('should handle error if adding a user fails', async () => {
    const req = {
      body: {
        username: 'testUser',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const error = new Error('Failed to add user');
    User.create.mockRejectedValue(error);

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error adding user' });
    expect(consoleLogSpy).toHaveBeenCalledWith('addUser: Creating user...');
    expect(consoleErrorSpy).toHaveBeenCalledWith('addUser: Error occurred while creating user', error);
  });
});