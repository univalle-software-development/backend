jest.mock('./src/db', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    return dbMock;
  });
  
  jest.mock('./src/models/User', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    return dbMock.define('User', {
      username: 'testUser',
      password: 'password123',
    });
  });
  
  jest.mock('./src/models/UserReview', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    return dbMock.define('UserReview', {
      movie_name: 'testMovie',
      review_score: 5,
      user_id: 1,
    });
  });
  