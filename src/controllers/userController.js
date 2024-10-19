const User = require('../models/User');
// addUser function in userController.js
exports.addUser = async (req, res) => {
    try {
      console.log('addUser: Creating user...');
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
      });
      console.log('addUser: User created successfully', newUser);
      res.status(201).json(newUser);
    } catch (err) { 
      console.error('addUser: Error occurred while creating user', err);
      res.status(500).json({ error: 'Error adding user' });
    }
  };

// getUser function to get a specific user
exports.getUser = async (req, res) => {
  try {
    console.log('getUser: Getting user...');
    const user_id = req.params.user_id;

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all reviews for the given user
    /* const reviews = await UserReview.findAll({
      where: { user_id }
    }); */
    console.log('getUser: User gotten successfully', user);
    res.status(200).json(user);
  } catch (err) {
    console.error('getUser: Error getting user', err);
    res.status(500).json({ error: 'Error getting user' });
  }
};