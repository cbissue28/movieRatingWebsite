import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";
import { fetchMovies, fetchTvSeries } from "./query"
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { searchMovie, searchTvSeries } from "./searchQuery";

//Enumeration defining the types of content to display.
export enum DisplayType {
    Movies = "movies",
    TvSeries = "tvseries",
}

//Home component for displaying movies and TV series based on user preferences and search input.
export const Home = () => {
    // State to manage whether to display Movies or TV Series.
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies);
    //State to manage user's search inputs
    const [searchInput, setSearchInput] = useState("");
    
    // UseQuery hook to fetch search results based on user input.
    const { data: searchData, isLoading: isLoadingSearch } = useQuery({
        queryKey: ["search", displayType, searchInput],

        //Asynchronous function responsible for fetching search results based on user input.
        queryFn: async () => {
          // Format the search input by trimming and replacing spaces with '+', as needed for the API.
          const formattedSearchInput = searchInput.trim().replace(/\s+/g, '+');
          
          // Fetch movies or TV series using the appropiate function based on the display type and formatted search input.
          return displayType === DisplayType.Movies
            ? searchMovie(formattedSearchInput)
            : searchTvSeries(formattedSearchInput);
        },
        //Enable the query only if there is a non-empty search input
        enabled: searchInput.trim() !== "",
      });
    
    // UseQuery hooks to fetch movie and TV series data.
    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["movies"], 
        queryFn: fetchMovies,
    });

    const { data: tvSeriesData, isLoading: isLoadingTvSeries } = useQuery({
        queryKey: ["tvseries"], 
        queryFn: fetchTvSeries,
    });
    
    // Redirect to the authentication page if the user is not logged in.
    if (localStorage.getItem("guest_session_id") === null) {
       return <Navigate to="/auth" />;
    }

    return (
        <div style={{ marginTop: 50, height: "auto" }}>
            {""}
            <Button.Group>
              {/* Buttons to switch between displaying movies and TV series. */}
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
            {/* Input for user to search for movies or TV series. */}
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
           // Display loading message while fetching data.
           <div style={{ color:"white"}}>Loading...</div>
           ) : (
           <div style={{ marginTop: 20 }}>
          {/* Display search results if there is a search query. */}
          {searchInput.trim() !== "" && searchData && searchData.results && (
            <ColumnDisplay data={searchData.results} displayType={displayType} />
          )}
          {/* Display movies if the user is viewing the Movies section. */}
          {displayType === DisplayType.Movies && !isLoadingMovies && !searchData && (
            <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} />
          )}
          {/* Display TV series if the user is viewing the TV Series section. */}
          {displayType === DisplayType.TvSeries && !isLoadingTvSeries && !searchData && (
            <ColumnDisplay data={tvSeriesData.results} displayType={DisplayType.TvSeries} />
          )}
        </div>
      )}
    </div>
  );
};