//The function performs the login mutation by requesting a new guest session ID and returns a data object containing the guest session ID.
export const mutationLogin = async () => {
    
    // Perform a fetch request to the MovieDB API to obtain a new guest session ID.
    const res = await fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        {
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjY4MDk0YzQzNjRmODE3NTZlOWFjMmI5YTA4NzQyZCIsInN1YiI6IjY1ZTExZDZmNmEzMDBiMDE3ZDFkZWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AU6tmOhDrwE4Q6E2WKZ_3jnqdAWI8uP7QCzbJKB8bo"
            },
        }
    );
    // Parse the JSON response and return the data object.
    return res.json();
};