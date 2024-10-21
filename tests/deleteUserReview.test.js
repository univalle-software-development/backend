const userReviewController = require('../src/controllers/userReviewController');
const UserReview = require('../src/models/UserReview');


jest.mock('../src/models/UserReview', () => ({
  findByPk: jest.fn(),
  destroy: jest.fn(),  
}));

describe('deleteUserReview Unit Test', () => {
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

  it('should delete a review if it exists', async () => {

    const mockReview = {
      id: 1,
      movie_name: 'Inception',
      destroy: jest.fn(),  
    };
    UserReview.findByPk.mockResolvedValue(mockReview);

    const req = {
      params: {
        review_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    
    await userReviewController.deleteUserReview(req, res);

    
    expect(UserReview.findByPk).toHaveBeenCalledWith(1);
    expect(mockReview.destroy).toHaveBeenCalled(); // Check that the destroy method was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Review deleted successfully' });
  });

  it('should return 404 if the review does not exist', async () => {
   
    UserReview.findByPk.mockResolvedValue(null);

    
    const req = {
      params: {
        review_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    
    await userReviewController.deleteUserReview(req, res);


    expect(UserReview.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Review not found' });
  });
  it('should return 500 if an error occurs during the deletion process', async () => {
    // Mock `findByPk` to throw an error
    jest.spyOn(UserReview, 'findByPk').mockImplementation(() => {
      throw new Error('Database error');
    });
    const req = {
      params: {
        review_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await  userReviewController.deleteUserReview(req, res);

    // Assert that the status 500 and error message are returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting review' });

    // Restore the original implementation of `findByPk`
    jest.restoreAllMocks();
  });

  
});

