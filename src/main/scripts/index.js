document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // API call to search for movies
        var query = document.getElementById('searchInput').value;
        var options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzNjZmViODM3ZGY4NzM5ZjRhZjRlMDBjZGFlMzBjYSIsInN1YiI6IjY1MzYxZjMxMmIyMTA4MDBhZTUyZGIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S0kcWgOPEHSXh9vNVpZninvf6yUPCupMPKOTjBSTkZg'
            }
        };

        fetch('https://api.themoviedb.org/3/search/multi?query=' + encodeURIComponent(query) + '&include_adult=true&language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => {
                var resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = '';
                response.results.forEach(movie => {
                    var movieDiv = document.createElement('div');

                    // Create an image for the movie poster
                    var posterImage = document.createElement('img');

                    if (movie.poster_path) {
                        posterImage.src = 'https://image.tmdb.org/t/p/w200' + movie.poster_path; // Adjust the size as needed
                    } else {
                        posterImage.src = 'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg';
                    }

                    posterImage.alt = movie.title;
                    posterImage.setAttribute('data-movie-id', movie.id);

                    var anchorTag = document.createElement('a');
                    anchorTag.href = 'movie/' + movie.id;

                    anchorTag.appendChild(posterImage);

                    var titleParagraph = document.createElement('p');
                    titleParagraph.textContent = movie.title;

                    movieDiv.appendChild(anchorTag);
                    movieDiv.appendChild(titleParagraph);
                    resultsDiv.appendChild(movieDiv);
                });
            })
            .catch(err => console.error(err));
    });
});
