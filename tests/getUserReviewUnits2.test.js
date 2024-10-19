const userReviewController = require('../src/controllers/userReviewController');
const UserReview = require('../src/models/UserReview');
const User = require('../src/models/User');

// Mock the User and UserReview models
jest.mock('../src/models/User', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../src/models/UserReview', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
}));

describe('UserReview Controller - Get User Reviews', () => {
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

  // Step to create a review before testing
  beforeEach(async () => {
    // Mock User.findByPk to return a valid user
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });

    // Create a mock review for the user
    UserReview.create.mockResolvedValue({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    });

    // Simulate creating the review
    await UserReview.create({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    });
  });

  it('should return reviews for an existing user', async () => {
    // Mock req and res
    const req = {
      params: { user_id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock UserReview.findAll to return the mock review
    UserReview.findAll.mockResolvedValue([{
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    }]);

    // Call the getUserReviews function
    await userReviewController.getUserReviews(req, res);

    // Assertions
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(UserReview.findAll).toHaveBeenCalledWith({ where: { user_id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1,
    }]);
  });

  it('should handle errors when fetching reviews', async () => {
    const req = {
      params: { user_id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error
    const error = new Error('Database error');
    UserReview.findAll.mockRejectedValue(error);

    await userReviewController.getUserReviews(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching reviews' });
    expect(consoleErrorSpy).toHaveBeenCalledWith('getUserReviews: Error fetching reviews', error);
  });
});
