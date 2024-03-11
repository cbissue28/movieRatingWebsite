/**
 * Both functions delete the user's rating for a specific movie/Tv series.
 * The parameter movieID is the unique identifier of the movie.
 * Returns a JSON representation of the response.
 */
export const deleteMovieRating = async (movieId: number) => {
    // Perform a fetch request to the MovieDB API to delete the rating using the guest session ID.
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`,
        {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "content-type": "application/json;charset=utf-8",
            }
        }
    );

    return res.json();
};

//The parameter tvSeriesID is the unique identifier of the Tv series.
export const deleteTvSeriesRating = async (tvSeriesId: number) => {
const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvSeriesId}/rating?guest_session_id=${localStorage.getItem(
        "guest_session_id"
    )}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
        method: "DELETE",
        headers: {
            accept: "application/json",
            "content-type": "application/json;charset=utf-8",
        }
    }
);

return res.json();
};
