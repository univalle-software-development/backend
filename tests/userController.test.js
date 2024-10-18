const { addUser } = require('../src/controllers/userController');
const User = require('../src/models/User');

describe('Add User Integration', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} }); // Clear the User table before each test
  });

  it('should add a new user to the database', async () => {
    const req = { body: { username: 'testUser', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await addUser(req, res);
    const createdUser = await User.findOne({ where: { username: 'testUser' } });

    expect(createdUser).not.toBeNull();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ username: 'testUser' }));
  });
});
