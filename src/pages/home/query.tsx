/**
* Both functions fetch the movies or shows to be displayed on the homepage.
* The parameter movieID is the unique identifier of the movie.
* Returns a JSON representation of the response.
*/
export const fetchMovies = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjY4MDk0YzQzNjRmODE3NTZlOWFjMmI5YTA4NzQyZCIsInN1YiI6IjY1ZTExZDZmNmEzMDBiMDE3ZDFkZWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AU6tmOhDrwE4Q6E2WKZ_3jnqdAWI8uP7QCzbJKB8bo"
            },
        }
    );

    return res.json();
};

export const fetchTvSeries = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        {
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjY4MDk0YzQzNjRmODE3NTZlOWFjMmI5YTA4NzQyZCIsInN1YiI6IjY1ZTExZDZmNmEzMDBiMDE3ZDFkZWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AU6tmOhDrwE4Q6E2WKZ_3jnqdAWI8uP7QCzbJKB8bo"
            },
        }
    );

    return res.json();
};