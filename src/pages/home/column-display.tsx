import { Button, Card, Form, Grid, Label } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link} from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvSeries } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteMovieRating, deleteTvSeriesRating } from "./deleteQuery";

//Interface defining the shape of data items displayed in the column.
interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    release_date: string;
    rating?: number;
}

//Props interface for the ColumnDisplay component.
interface Props {
    data: DisplayData[];
    displayType: DisplayType;
    isRated?: boolean;
}

/**
 * Functional component to display a grid of cards with information about movies or TV series.
 * Allows users to rate and delete ratings for each item.
 */
export const ColumnDisplay = (props: Props) => {
    const { data, displayType, isRated } = props;
    const [rating, setRating] = useState<number>(0)

    /**
     * Function to be called on successful mutation when adding or deleting a rating.
     * It handles refreshing the page when deleting a rating on the personal ratings page 
     * It shows a success toast for a successful rating on the homepage.
     */
    const onSuccess = () => {
        if (window.location.pathname === "/personalratings") {
          window.location.reload();
        } else {
          toast.success("Rating successful", { autoClose: 2000 });
        }
      };

    //Function to be called on mutation error. It shows an error toast.
    const onError = () => {
        toast.success("Something went wrong")
    };
    
    // Rate and delete rating mutations based on the display type.
    const {mutate: rateMovieMutation} = useMutation({
        mutationKey: ["rateMovie"],
        mutationFn: (id: number) => rateMovie(id, rating),
        onSuccess,
        onError,
    });

    const {mutate: rateTvSeriesMutation} = useMutation({
        mutationKey: ["rateTvSeries"],
        mutationFn: (id: number) => rateTvSeries(id, rating),
        onSuccess,
        onError,
    });

    const {mutate: deleteMovieRatingMutation} = useMutation({
        mutationKey: ["deleteMovieRating"],
        mutationFn: (id: number) => deleteMovieRating(id),
        onSuccess,
        onError,
    });

    const {mutate: deleteTvSeriesRatingMutation} = useMutation({
        mutationKey: ["deleteTvSeriesRating"],
        mutationFn: (id: number) => deleteTvSeriesRating(id),
        onSuccess,
        onError,
    });

    // Determine the correct rate and delete rating functions based on the display type. 
    const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvSeriesMutation

    const deleteRating =
    displayType === DisplayType.Movies ? deleteMovieRatingMutation : deleteTvSeriesRatingMutation




    return (
        <Grid
        columns={3}
        stackable
        centered
        verticalAlign="top"
        padded="vertically">
            {data.map((displayData: DisplayData) => (
                <Grid.Column key={displayData.id}>
                    <Card.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link to={`/${displayType === DisplayType.Movies ? "movie" : "tvseries"}/${displayData.id}`}>  
                       
                        <Card
                        style={{ height: 820 }}
                        fluid
                        image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                        header={
                            displayType === DisplayType.Movies
                            ? displayData.title
                            : displayData.name
                        }
                        meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average.toFixed(2)}`}
                        description={displayData.overview.slice(0, 350) + "..."}
                        />{" "}
                        </Link>
                        <Form style={{marginTop: 10}}>
                            <Form.Group inline>
                                <Form.Field>
                                    <Form.Input 
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.5"
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    action={{
                                        color: "blue",
                                        labelPosition: "right",
                                        icon: "archive",
                                        content: "Rate",
                                        //Triggers the rate function
                                        onClick: () => rate(displayData.id),
                                    }} />

                                </Form.Field>

                            </Form.Group>
                        </Form>
                        {/* Displays a rating and delete rating button only if the movie/TV series has been rated. */}
                        {isRated && (
                        <div style={{ textAlign: 'center' }}>
                           <div>
                           <Label color="grey" style={{ fontSize: '1em', marginBottom: 10 }}>
                           Your Personal Rating: {displayData.rating}
                           </Label>
                           </div>
                           {/* Button triggers deleteRating function. */}
                           <Button animated color="red" onClick={() => deleteRating(displayData.id)}>
                              <Button.Content visible>Delete Rating</Button.Content>
                              <Button.Content hidden>
                              <i className="times icon"></i>
                              </Button.Content>
                           </Button>
                        </div>
                        )}
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    )
};
