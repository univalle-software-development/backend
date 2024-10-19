const userReviewController = require('../src/controllers/userReviewController');
const UserReview = require('../src/models/UserReview');
const User = require('../src/models/User');

// Mock the User and UserReview models
jest.mock('../src/models/User', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../src/models/UserReview', () => ({
  findAll: jest.fn(),
}));

describe('UserReview Controller - Get User Reviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all reviews for a specific user successfully', async () => {
    // Mock User.findByPk to return a valid user
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });

    // Mock UserReview.findAll to return a list of reviews
    UserReview.findAll.mockResolvedValue([
      {
        movie_name: 'Inception',
        review_score: 9,
        review_comment: 'Great movie!',
        user_id: 1,
      },
    ]);

    const req = { params: { user_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.getUserReviews(req, res);

    // Assertions
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(UserReview.findAll).toHaveBeenCalledWith({ where: { user_id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        movie_name: 'Inception',
        review_score: 9,
        review_comment: 'Great movie!',
        user_id: 1,
      },
    ]);
  });

  it('should return 404 if the user is not found', async () => {
    // Mock User.findByPk to return null (user not found)
    User.findByPk.mockResolvedValue(null);

    const req = { params: { user_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.getUserReviews(req, res);

    // Assertions
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle database errors gracefully', async () => {
    // Mock User.findByPk to return a valid user
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });

    // Mock UserReview.findAll to throw an error
    UserReview.findAll.mockRejectedValue(new Error('Database error'));

    const req = { params: { user_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.getUserReviews(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching reviews' });
  });
});
