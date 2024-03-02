import { useParams } from "react-router";
import { Grid, Header, Loader, Segment, Image, List, Label } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";
import { useQuery } from "@tanstack/react-query";


export const Movie = () => {
    const { id } = useParams<string>();

    if (!id) {
        return <div>Invalid Movie ID</div>
    }

    const { data, isLoading } = useQuery({
        queryKey: ["movie"],
        queryFn: () => fetchMovieDetails(id),
    });

    if (isLoading) {
        return <Loader active />
    }

    return ( 
    <div style={{ marginTop: 50 }}>
        <Segment>
            <Header> {data.title} </Header>
            <Grid columns={2} divided textAlign="left" style={{marginTop: 20 }}>                
            <Grid.Row>
                <Grid.Column width={6}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        }}> 
                        <Image
                        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                        size="medium"
                        centred
                        />
                        </div>
                </Grid.Column>  
                <Grid.Column width={10}>
                    <List>
                        <List.Item>
                            <List.Header> Is the movie for adults: </List.Header>
                            {data.adult ? "Yes" : "No"}
                        </List.Item>
                        <List.Item>
                            <List.Header> Budget: </List.Header>
                            {data.budget}
                        </List.Item>
                        <List.Item>
                            <List.Header> Genres: </List.Header>
                            {data.genres.map((genre: any) => (
                                <Label key={genre.id}> {genre.name} </Label>
                            ))}
                        </List.Item>
                        <List.Item>
                            <List.Header> Release Date: </List.Header>
                            {data.release_date}
                        </List.Item>
                        <List.Item>
                            <List.Header> Vote Average: </List.Header>
                            {data.vote_average}
                        </List.Item>
                        <List.Item>
                            <List.Header> Original Language: </List.Header>
                            {data.original_language}
                        </List.Item>
                    </List>
                </Grid.Column>    
            </Grid.Row>
          </Grid>
        </Segment>
    </div>
    );
};