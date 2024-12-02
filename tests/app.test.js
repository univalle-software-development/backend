// app.test.js
const request = require('supertest');
const {app, server} = require('../src/server.js');
const { searchMovies } = require('../src/services/movies_service.js');

global.fetch = jest.fn();

describe('API Endpoints', () => {
	afterAll((done) => {
		server.close(() => {
			console.log('Server closed');
			done(); // Call done after the server is closed
		});
		
	});

	afterEach(() => {
		jest.clearAllMocks(); // Clear mocks after each test
	});
	
	it('should return Hello, World! on GET /', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
		expect(response.text).toBe('Hello, World from version 1!');
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

	it('should return null if search parameter is an empty string', async () => {
		const result = await searchMovies({ search: '' });
		expect(result).toBeNull(); // Expect the result to be null
	});

    it('should return null if no movies are found', async () => {
		// Mock the fetch function to return an empty Search array
		fetch.mockResolvedValueOnce({
			json: jest.fn().mockResolvedValueOnce({ Search: [] }), // Simulate no movies found
		});

		const result = await searchMovies({ search: 'test' });
		expect(result).toEqual([]);// Expect the result to be null
	});

	it('should return a list of movies when search is valid', async () => {
		const mockResponse = {
			Search: [
				{ imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'image1.jpg' },
				{ imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'image2.jpg' },
			],
		};

		fetch.mockResolvedValueOnce({
			json: jest.fn().mockResolvedValueOnce(mockResponse),
		});

		const result = await searchMovies({ search: 'test' });
		expect(result).toEqual([
			{ id: '1', title: 'Movie 1', year: '2021', image: 'image1.jpg' },
			{ id: '2', title: 'Movie 2', year: '2022', image: 'image2.jpg' },
		]);
	});

	it('should throw an error if there is an error in fetch', async () => {
		fetch.mockRejectedValueOnce(new Error('Network error'));

		await expect(searchMovies({ search: 'test' })).rejects.toThrow('Error searching movies');
	});

	it('should return 200 and a list of movies when search is valid', async () => {
		const mockResponse = {
			Search: [
				{ imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'image1.jpg' },
				{ imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'image2.jpg' },
			],
		};

		fetch.mockResolvedValueOnce({
			json: jest.fn().mockResolvedValueOnce(mockResponse),
		});

		const response = await request(app).get('/search?q=test');
		expect(response.status).toBe(200); // Expect 200 status
		expect(response.body).toEqual([
			{ id: '1', title: 'Movie 1', year: '2021', image: 'image1.jpg' },
			{ id: '2', title: 'Movie 2', year: '2022', image: 'image2.jpg' },
		]); // Expect the correct movie objects
	});

	it('should return 500 if there is an error in searchMovies', async () => {
		fetch.mockRejectedValueOnce(new Error('Network error'));

		const response = await request(app).get('/search?q=test');
		expect(response.status).toBe(500); // Expect 500 status
		expect(response.body).toEqual({ message: 'Error searching movies' }); // Expect the correct error message
	});
	
});
