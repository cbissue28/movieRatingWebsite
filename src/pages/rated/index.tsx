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
    
    return(
        <Container style={{ marginTop: 50 }}>
            {" "}
            <Menu pointing secondary>
                <Menu.Item name="Movies" active={activeTabs === DisplayType.Movies}
                onClick={() => setActiveTabs(DisplayType.Movies)}
            />
            <Menu.Item name="TV Series" active={activeTabs === DisplayType.TvSeries}
                onClick={() => setActiveTabs(DisplayType.TvSeries)}
            />
            </Menu>

            <Segment>
                {activeTabs === DisplayType.Movies ? ( 
                <div>
                    <Header as={"h2"}>
                        Rated Movies
                    </Header>
                    <ColumnDisplay 
                    data={ratedMovies.results}
                    displayType={DisplayType.Movies}
                    isRated
                    />
                </div> 
                ) : (
                    <div>
                    <Header as={"h2"}>
                        Rated Tv Series
                    </Header>
                    <ColumnDisplay 
                    data={ratedTvSeries.results}
                    displayType={DisplayType.TvSeries}
                    isRated
                    />
                </div> 
                    )}
            </Segment>
        </Container>
    )
}