const userReviewController = require('../src/controllers/userReviewController');
const UserReview = require('../src/models/UserReview');
const User = require('../src/models/User');

// Mock the User and UserReview models
jest.mock('../src/models/User', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../src/models/UserReview', () => ({
  create: jest.fn(),
}));

describe('addUserReview Unit Test', () => {
  let consoleErrorMock;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore(); 
  });

  it('should create a review for an existing user', async () => {
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });
    UserReview.create.mockResolvedValue({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    });

    const req = {
      body: {
        movie_name: 'Inception',
        review_score: 9,
        review_comment: 'Great movie!',
        user_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.addUserReview(req, res);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(UserReview.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    });
  });

  it('should return 404 if user is not found', async () => {
    User.findByPk.mockResolvedValue(null);

    const req = {
      body: {
        movie_name: 'Inception',
        review_score: 9,
        review_comment: 'Great movie!',
        user_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.addUserReview(req, res);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(UserReview.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should return 500 if an error occurs while creating review', async () => {
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });
    UserReview.create.mockRejectedValue(new Error('Database error'));

    const req = {
      body: {
        movie_name: 'Inception',
        review_score: 9,
        review_comment: 'Great movie!',
        user_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.addUserReview(req, res);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(UserReview.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error adding review' });

  });
});

