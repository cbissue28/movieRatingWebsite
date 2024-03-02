export const fetchTvSeriesDetails = async (tvSeriesId: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvSeriesId}?language=en-US`,
        {
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjY4MDk0YzQzNjRmODE3NTZlOWFjMmI5YTA4NzQyZCIsInN1YiI6IjY1ZTExZDZmNmEzMDBiMDE3ZDFkZWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AU6tmOhDrwE4Q6E2WKZ_3jnqdAWI8uP7QCzbJKB8bo"
            },
        }
    );

    return res.json();
};