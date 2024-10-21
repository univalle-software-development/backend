// app.test.js
const request = require('supertest');
const {app, server} = require('../src/server.js');


describe('API Endpoints', () => {
	afterAll((done) => {
		server.close(() => {
        console.log('Server closed');
        done(); // Call done after the server is closed
  });
  
   });
		
  it('should return Hello, World! on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });

  it('should return About Page on GET /about', async () => {
    const response = await request(app).get('/about');
    expect(response.status).toBe(200);
    expect(response.text).toBe('About Page');
  });

  it('should return Contact Page on GET /contact', async () => {
    const response = await request(app).get('/contact');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Contact Page');
  });

  it('should return Error Page on GET /404', async () => {
    const response = await request(app).get('/404');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Not found');
  });

});
