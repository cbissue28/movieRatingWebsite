import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";
import { fetchMovies, fetchTvSeries } from "./query"
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { searchMovie, searchTvSeries } from "./searchQuery";

export enum DisplayType {
    Movies = "movies",
    TvSeries = "tvseries",
}

export const Home = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies);
    const [searchInput, setSearchInput] = useState("");

    const { data: searchData, isLoading: isLoadingSearch } = useQuery({
        queryKey: ["search", displayType, searchInput],
        queryFn: async () => {
          const formattedSearchInput = searchInput.trim().replace(/\s+/g, '+');
          return displayType === DisplayType.Movies
            ? searchMovie(formattedSearchInput)
            : searchTvSeries(formattedSearchInput);
        },
        enabled: searchInput.trim() !== "",
      });

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["movies"], 
        queryFn: fetchMovies,
    });

    const { data: tvSeriesData, isLoading: isLoadingTvSeries } = useQuery({
        queryKey: ["tvseries"], 
        queryFn: fetchTvSeries,
    });

    if (localStorage.getItem("guest_session_id") === null) {
       return <Navigate to="/auth" />;
    }

    return (
        <div style={{ marginTop: 50, height: "auto" }}>
            {""}
            <Button.Group>
                <Button
                color={displayType === DisplayType.Movies ? "blue" : undefined}
                onClick={() => setDisplayType(DisplayType.Movies)}>
                    Movies
                </Button>
                <Button
                color={displayType === DisplayType.TvSeries ? "blue" : undefined}
                onClick={() => setDisplayType(DisplayType.TvSeries)}>
                    TV Series
                </Button>
            </Button.Group>

            <div className="ui search" style={{ marginTop: 25, fontSize: "1.5em" }}>
            <div className="ui icon input">
            <input
            className="prompt"
            type="text"
            placeholder={displayType === DisplayType.Movies? "Search for a Movie..." : "Search for a TV Series..."}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}/>
            <i className="search icon"></i>
            </div>
            <div className="results"></div>
             </div>

             {isLoadingMovies || isLoadingTvSeries || isLoadingSearch ? (
        <div style={{ color:"white"}}>Loading...</div>
           ) : (
        <div style={{ marginTop: 20 }}>
          {searchInput.trim() !== "" && searchData && searchData.results && (
            <ColumnDisplay data={searchData.results} displayType={displayType} />
          )}

          {displayType === DisplayType.Movies && !isLoadingMovies && !searchData && (
            <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} />
          )}

          {displayType === DisplayType.TvSeries && !isLoadingTvSeries && !searchData && (
            <ColumnDisplay data={tvSeriesData.results} displayType={DisplayType.TvSeries} />
          )}
        </div>
      )}
    </div>
  );
};