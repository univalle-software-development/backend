const UserReview = require('../models/UserReview');
const User = require('../models/User');

// addUserReview function in userReviewController.js
exports.addUserReview = async (req, res) => {
  try {
    const { movie_name, review_score, review_comment, user_id } = req.body;

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new review
    const newReview = await UserReview.create({
      movie_name,
      review_score,
      review_comment,
      user_id
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error('addUserReview: Error occurred while creating review', err);
    res.status(500).json({ error: 'Error adding review' });
  }
};

// getUserReviews function to fetch all reviews for a specific user
exports.getUserReviews = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all reviews for the given user
    const reviews = await UserReview.findAll({
      where: { user_id }
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error('getUserReviews: Error fetching reviews', err);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

// deleteUserReview function to delete a specific review by ID
exports.deleteUserReview = async (req, res) => {
  try {
    const review_id = req.params.review_id;

    // Find the review by ID
    const review = await UserReview.findByPk(review_id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Delete the review
    await review.destroy();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('deleteUserReview: Error deleting review', err);
    res.status(500).json({ error: 'Error deleting review' });
  }
};

