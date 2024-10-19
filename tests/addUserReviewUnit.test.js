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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a review for an existing user', async () => {
    // Mock User.findByPk to return a valid user
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });

    // Mock UserReview.create to return a new review
    UserReview.create.mockResolvedValue({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    });

    // Mock req and res
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

    // Call the addUserReview function
    await userReviewController.addUserReview(req, res);

    // Assertions
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
});
