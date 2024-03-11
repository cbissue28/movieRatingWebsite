/**
 * Both functions search for a movie/Tv series based on the provided query.
 * Returns a JSON representation of the response.
 */
export const searchMovie = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjY4MDk0YzQzNjRmODE3NTZlOWFjMmI5YTA4NzQyZCIsInN1YiI6IjY1ZTExZDZmNmEzMDBiMDE3ZDFkZWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AU6tmOhDrwE4Q6E2WKZ_3jnqdAWI8uP7QCzbJKB8bo",
      },
    }
  );

  return res.json();
};

export const searchTvSeries = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjY4MDk0YzQzNjRmODE3NTZlOWFjMmI5YTA4NzQyZCIsInN1YiI6IjY1ZTExZDZmNmEzMDBiMDE3ZDFkZWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AU6tmOhDrwE4Q6E2WKZ_3jnqdAWI8uP7QCzbJKB8bo",
      },
    }
  );

  return res.json();
};