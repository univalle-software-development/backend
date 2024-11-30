// Import the express module
const express = require('express');
const { searchMovies  } = require('./services/movies_service.js');
// Create an instance of express
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});

app.get('/404', (req, res) => {
  res.status(404).send('Not found');
});

app.get('/search', async (req, res) => {
  const { query } = req; // Get the query parameters
  const search = query.q; // Assuming the search term is passed as a query parameter 'q'

  try {
    const movies = await searchMovies({ search });
    if (movies) {
      res.json(movies); // Return the movies as JSON
    } else {
      res.status(404).json({ message: 'No movies found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {app, server};

