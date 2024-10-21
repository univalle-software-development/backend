const userReviewController = require('../src/controllers/userReviewController');
const UserReview = require('../src/models/UserReview');


jest.mock('../src/models/UserReview', () => ({
  findByPk: jest.fn(),
  destroy: jest.fn(),  
}));

describe('deleteUserReview Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
