document.addEventListener('DOMContentLoaded', function () {
    // Extract the movie ID from the URL
    var path = window.location.pathname;
    var movieId = path.split('/').pop(); // Get the last part of the path

    // Fetch movie details using the movie ID
    var options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzNjZmViODM3ZGY4NzM5ZjRhZjRlMDBjZGFlMzBjYSIsInN1YiI6IjY1MzYxZjMxMmIyMTA4MDBhZTUyZGIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S0kcWgOPEHSXh9vNVpZninvf6yUPCupMPKOTjBSTkZg'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US', options)
        .then(response => response.json())
        .then(movie => {
            if (movie.poster_path) {
                document.getElementById('moviePoster').src = 'https://image.tmdb.org/t/p/w200' + movie.poster_path;
            } else {
                document.getElementById('moviePoster').src = 'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg';
            }
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieOverview').textContent = movie.overview;
            document.getElementById('movieReleaseDate').textContent = 'Release date: ' + movie.release_date;
        })
        .catch(err => console.error(err));
});
