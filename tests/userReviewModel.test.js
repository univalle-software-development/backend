const User = require('../src/models/User');
const UserReview = require('../src/models/UserReview');

describe('UserReview Model', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should create a UserReview successfully', async () => {
    const userCreateSpy = jest.spyOn(User, 'create').mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
    });
    
    const mockReview = {
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: 1
    };
    const reviewCreateSpy = jest.spyOn(UserReview, 'create').mockResolvedValue(mockReview);

    const user = await User.create({ username: 'testuser', email: 'testuser@example.com' });
    const review = await UserReview.create({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: user.id,
    });

    expect(userCreateSpy).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'testuser@example.com',
    });
    expect(reviewCreateSpy).toHaveBeenCalledWith({
      movie_name: 'Inception',
      review_score: 9,
      review_comment: 'Great movie!',
      user_id: user.id,
    });

    expect(review).toBeDefined();
    expect(review.movie_name).toBe('Inception');
    expect(review.review_score).toBe(9);
    expect(review.review_comment).toBe('Great movie!');
    expect(review.user_id).toBe(user.id);
  });

  test('should not create UserReview without required fields', async () => {
    const reviewCreateSpy = jest.spyOn(UserReview, 'create').mockRejectedValue(new Error('Validation error'));

    await expect(UserReview.create({
      review_score: 9,
      user_id: 1,
    })).rejects.toThrow('Validation error');

    expect(reviewCreateSpy).toHaveBeenCalledWith({
      review_score: 9,
      user_id: 1,
    });
  });

  test('should be associated with a User', async () => {
    // Mock user creation and association with review
    const mockUser = { id: 2, username: 'anotheruser', email: 'anotheruser@example.com' };
    const mockReview = { id: 1, movie_name: 'Avatar', review_score: 8, user_id: mockUser.id };

    const userCreateSpy = jest.spyOn(User, 'create').mockResolvedValue(mockUser);
    const reviewCreateSpy = jest.spyOn(UserReview, 'create').mockResolvedValue(mockReview);
    const reviewFindOneSpy = jest.spyOn(UserReview, 'findOne').mockResolvedValue({
      ...mockReview,
      User: mockUser,
    });

    const user = await User.create({ username: 'anotheruser', email: 'anotheruser@example.com' });
    const review = await UserReview.create({
      movie_name: 'Avatar',
      review_score: 8,
      user_id: user.id,
    });

    const foundReview = await UserReview.findOne({ where: { id: review.id }, include: User });

    expect(reviewFindOneSpy).toHaveBeenCalledWith({
      where: { id: review.id },
      include: User,
    });

    expect(foundReview.User).toBeDefined();
    expect(foundReview.User.username).toBe('anotheruser');
  });
});

