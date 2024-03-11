import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";

// Auth component for user authentication.

export const Auth = () => {
    // Use mutation to handle the login process.
    const { mutate } = useMutation({ mutationKey: ["login"], 
    mutationFn: mutationLogin,

    //onSuccess callback executed when mutationLogin function successfully returns data.     
    onSuccess: (data) => {
        // Save the guest_session_id in localStorage upon successful login.
        localStorage.setItem("guest_session_id", data.guest_session_id);
        // Navigate to the home page after successful login.
        navigate("/");
    }
}); 
    // Access the navigation function from the React Router.
    const navigate = useNavigate();

    //Handle login function, triggers the login mutation.
    const handleLogin = async () => {
    // Call the login mutation.
    mutate();
};
    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                    Welcome! login by registering as a Guest below.
                </Header>
                <Form size="large">
                    <Segment stacked id="authScreen">
                        {/* Button to trigger the login process. */}
                        <Button color="blue" size="large" fluid onClick={handleLogin}>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}