jest.mock('../src/models/UserReview', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('UserReview', {
    id: 1,
    movie_name: 'testMovie',
    review_score: 5,
    review_comment: 'testComment',
    user_id: 1,
  });
});

const UserReview = require('../src/models/UserReview');

describe('UserReview Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('UserReview model should be defined', () => {
    expect(UserReview).toBeDefined();
    expect(typeof UserReview.create).toBe('function');
    expect(typeof UserReview.findOne).toBe('function');
  });

  test('should create a UserReview successfully', async () => {
    const mockReview = {
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1
    };
    
    const createdReview = await UserReview.create(mockReview);
    expect(createdReview.movie_name).toBe(mockReview.movie_name);
    expect(createdReview.review_score).toBe(mockReview.review_score);
    expect(createdReview.review_comment).toBe(mockReview.review_comment);
    expect(createdReview.user_id).toBe(mockReview.user_id);
  });

  test('should find a UserReview', async () => {
    const mockReview = {
      id: 1,
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1
    };

    UserReview.findOne = jest.fn().mockResolvedValue(mockReview);

    const foundReview = await UserReview.findOne({ where: { id: 1 } });
    expect(foundReview).toEqual(mockReview);
    expect(UserReview.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('should handle UserReview not found', async () => {
    UserReview.findOne = jest.fn().mockResolvedValue(null);

    const foundReview = await UserReview.findOne({ where: { id: 999 } });
    expect(foundReview).toBeNull();
    expect(UserReview.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });
});
