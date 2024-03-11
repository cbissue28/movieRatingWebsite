import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react"
import { DisplayType } from "../home"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvSeries } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

// React component to display the user's rated movies and TV series.
export const Rated = () => {
    // State to track the active tab (Movies or TV Series)
    const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);
    
    // UseQuery hook to fetch rated movies by the user
    const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
        queryKey: ["ratedMovies"],
        queryFn: fetchRatedMovies,
    });
    
    // UseQuery hook to fetch rated TV Series by the user
    const { data: ratedTvSeries, isLoading: isLoadingRatedTvSeries } = useQuery({
        queryKey: ["ratedTvSeries"],
        queryFn: fetchRatedTvSeries,
    });

    // If rated movies or TV series are still loading, display a loader
    if (isLoadingRatedMovies || isLoadingRatedTvSeries) {
        return <Loader active />;
    }
    
    // If the user is not logged in, redirect to the authentication page
    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    // Render the Rated component with movies and TV series tabs
    return (
        <Container style={{ marginTop: 80 }}>
            {" "}
            <Menu pointing secondary>
                 {/* Tab for Rated Movies */}
                <Menu.Item name="Movies" style={{ color: 'white' }} active={activeTabs === DisplayType.Movies}
                    onClick={() => setActiveTabs(DisplayType.Movies)}
                />
                {/* Tab for Rated TV Series */}
                <Menu.Item name="TV Series" style={{ color: 'white' }} active={activeTabs === DisplayType.TvSeries}
                    onClick={() => setActiveTabs(DisplayType.TvSeries)}
                />
            </Menu>

            <Segment id="ratedScreen">
                {activeTabs === DisplayType.Movies ? (
                    <div>
                        <Header as={"h2"} style={{ color: 'white' }}>
                            Rated Movies
                        </Header>
                         {/* Display Rated Movies or a message if none are rated */}
                        {ratedMovies && ratedMovies.results && ratedMovies.results.length > 0 ? (
                            <ColumnDisplay
                                data={ratedMovies.results}
                                displayType={DisplayType.Movies}
                                isRated
                            />
                        ) : (
                            <Header as={"h1"} style={{ color: 'teal', marginTop: 230 }}>You currently have no rated Movies</Header>
                        )}
                    </div>
                ) : (
                    <div>
                        <Header as={"h2"} style={{ color: 'white' }}>
                            Rated Tv Series
                        </Header>
                        {/* Display Rated TV Series or a message if none are rated */}
                        {ratedTvSeries && ratedTvSeries.results && ratedTvSeries.results.length > 0 ? (
                            <ColumnDisplay
                                data={ratedTvSeries.results}
                                displayType={DisplayType.TvSeries}
                                isRated
                            />
                        ) : (
                            <Header as={"h1"} style={{ color: 'teal', marginTop: 230 }}>You currently have no rated Tv Series</Header>
                        )}
                    </div>
                )}
            </Segment>
        </Container>
    );
};