const { addUser, getUser } = require('../src/controllers/userController');
const User = require('../src/models/User');

jest.mock('../src/models/User', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
}));

describe('User Controller - Get User', () => {
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

  it('should get a specific user successfully', async () => {
    const req = {
      params: { user_id: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUser = { id: 1, username: 'testUser' };
    User.findByPk.mockResolvedValue(mockUser);

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
    expect(consoleLogSpy).toHaveBeenCalledWith('getUser: Getting user...');
    expect(consoleLogSpy).toHaveBeenCalledWith('getUser: User gotten successfully', mockUser);
  });

  it('should return 404 if the user is not found', async () => {
    const req = {
      params: { user_id: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const error = new Error('Failed to get user');
    User.findByPk.mockResolvedValue(null);

    await getUser(req, res);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle error if getting a user fails', async () => {
    const req = {
      params: { user_id: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const error = new Error('Failed to get user');
    User.findByPk.mockRejectedValue(error);  // Simulamos que findByPk falla

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting user' });
    expect(consoleLogSpy).toHaveBeenCalledWith('getUser: Getting user...');
    expect(consoleErrorSpy).toHaveBeenCalledWith('getUser: Error getting user', error);
  });
});