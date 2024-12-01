const API_KEY = '4287ad07'

const searchMovies = async ({ search }) => {
	if (search === '') return null

	try {
		const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
		const json = await response.json()

		const movies = json.Search

		if (movies && movies.length > 0) { // Check if movies array is not empty
			return movies.map(movie => ({
				id: movie.imdbID,
				title: movie.Title,
				year: movie.Year,
				image: movie.Poster
			}))
		} else {
			return []; // Return 404 if no movies found
		}	
	} catch (e) {
		throw new Error('Error searching movies')
	}
}

module.exports = { searchMovies };
