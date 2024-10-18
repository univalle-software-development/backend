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
  