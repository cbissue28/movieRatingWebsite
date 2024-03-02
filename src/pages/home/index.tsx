import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";

import { fetchMovies, fetchTvSeries } from "./query"
import { useQuery } from "@tanstack/react-query";

export enum DisplayType {
    Movies = "movies",
    TvSeries = "tvseries",
}

export const Home = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies);

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["movies"], 
        queryFn: fetchMovies,
    });

    const { data: tvSeriesData, isLoading: isLoadingTvSeries } = useQuery({
        queryKey: ["tvseries"], 
        queryFn: fetchTvSeries,
    });

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

            {isLoadingMovies || isLoadingTvSeries ? (
                <div>Loading...</div>
            ) : (
            <div style={{marginTop: 20}}>
                {displayType === DisplayType.Movies ? ( 
                <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} />
                ) : ( 
                <ColumnDisplay data={tvSeriesData.results} displayType={DisplayType.TvSeries} /> 
                )}
            </div>
            )}
        </div>
    );
};