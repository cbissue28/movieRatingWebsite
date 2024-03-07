export const deleteMovieRating = async (movieId: number) => {
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
