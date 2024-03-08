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
            <Header as={"h1"} style={{ color: "white" }}> {data.title} </Header>
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
                    <List style={{ color: "white" }}>
                    <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Length of the Movie: </List.Header>
                            {`${Math.floor(data.runtime / 60)} Hours and ${data.runtime % 60} Minutes`}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Budget For The Movie: </List.Header>
                            $ {data.budget.toLocaleString()}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white", marginBottom: 10 }}> Genres: </List.Header>
                            {data.genres.map((genre: any) => (
                                <Label key={genre.id}> {genre.name} </Label>
                            ))}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Release Date: </List.Header>
                            {data.release_date}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Voter Average: </List.Header>
                            {data.vote_average.toFixed(2)}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Original Language: </List.Header>
                            {data.original_language.toUpperCase()}
                        </List.Item>
                        <List.Item>
                           <List.Header style={{ color: "white", marginBottom: 15 }}> Production Company: </List.Header>
                           {data.production_companies.filter((company: any) => company.logo_path !== null)
                           .map((production_company: any) => (
                           <Image
                            key={production_company.id}
                            src={`https://image.tmdb.org/t/p/original/${production_company.logo_path}`}
                            size="small"
                            style={{ marginRight: 10 }}
                            />
                            ))}
                        </List.Item>
                    </List>
                </Grid.Column>    
            </Grid.Row>
          </Grid>
        </Segment>
    </div>
    );
};