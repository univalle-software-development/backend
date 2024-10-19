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
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Espiamos y anulamos console.error
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore(); // Restauramos el comportamiento original después de cada prueba
  });

  it('should fetch all reviews for a specific user successfully', async () => {
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });

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
    User.findByPk.mockResolvedValue(null);

    const req = { params: { user_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.getUserReviews(req, res);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle database errors gracefully', async () => {
    User.findByPk.mockResolvedValue({ id: 1, username: 'testuser' });
    UserReview.findAll.mockRejectedValue(new Error('Database error'));

    const req = { params: { user_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userReviewController.getUserReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching reviews' });

    // Verificamos que el error de consola haya sido llamado pero sin que se imprima
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'getUserReviews: Error fetching reviews',
      expect.any(Error)
    );
  });
});
