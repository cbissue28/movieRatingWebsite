import { useParams } from "react-router";
import { Grid, Header, Loader, Segment, Image, List, Label } from "semantic-ui-react";
import { fetchTvSeriesDetails } from "./query";
import { useQuery } from "@tanstack/react-query";

export const TvSeries = () => {
    const { id } = useParams<string>();

    if (!id) {
        return <div>Invalid Tv Series ID</div>
    }

    const { data, isLoading } = useQuery({
        queryKey: ["tvSeries"],
        queryFn: () => fetchTvSeriesDetails(id),
    });

    if (isLoading) {
        return <Loader active />
    }

    return ( 
    <div style={{ marginTop: 50 }}>
        <Segment>
            <Header as={"h1"} style={{ color: "white" }}> {data.name} </Header>
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
                            <List.Header style={{ color: "white" }}> Created By: </List.Header>
                            {data.created_by 
                             .map((creator: any)=> creator.name)
                             .join(", ")}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Number of Episodes: </List.Header>
                            {data.number_of_episodes}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Number of Seasons: </List.Header>
                            {data.number_of_seasons}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white", marginBottom: 10 }}> Genres: </List.Header>
                            {data.genres.map((genre: any) => (
                                <Label key={genre.id}> {genre.name} </Label>
                            ))}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> First Aired: </List.Header>
                            {data.first_air_date}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Ongoing?: </List.Header>
                            {data.in_production ? "Yes" : "No"}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Vote Average: </List.Header>
                            {data.vote_average}
                        </List.Item>
                        <List.Item style={{ marginBottom: 10 }}>
                            <List.Header style={{ color: "white" }}> Original Language: </List.Header>
                            {data.original_language.toUpperCase()}
                        </List.Item>
                        <List.Item>
                            <List.Header style={{ color: "white", marginBottom: 15 }}> Networks: </List.Header>
                            {data.networks
                              .filter((network: any) => network.logo_path !== null)
                              .map((network: any) => (
                                <Image
                                  key={network.id}
                                  src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
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