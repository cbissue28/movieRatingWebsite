import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react"
import { DisplayType } from "../home"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvSeries } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
    const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

    const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
        queryKey: ["ratedMovies"],
        queryFn: fetchRatedMovies,
    });

    const { data: ratedTvSeries, isLoading: isLoadingRatedTvSeries } = useQuery({
        queryKey: ["ratedTvSeries"],
        queryFn: fetchRatedTvSeries,
    });

    if (isLoadingRatedMovies || isLoadingRatedTvSeries) {
        return <Loader active />;
    }

    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    return (
        <Container style={{ marginTop: 80 }}>
            {" "}
            <Menu pointing secondary>
                <Menu.Item name="Movies" style={{ color: 'white' }} active={activeTabs === DisplayType.Movies}
                    onClick={() => setActiveTabs(DisplayType.Movies)}
                />
                <Menu.Item name="TV Series" style={{ color: 'white' }} active={activeTabs === DisplayType.TvSeries}
                    onClick={() => setActiveTabs(DisplayType.TvSeries)}
                />
            </Menu>

            <Segment>
                {activeTabs === DisplayType.Movies ? (
                    <div>
                        <Header as={"h2"} style={{ color: 'white' }}>
                            Rated Movies
                        </Header>
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