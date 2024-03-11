import { Button, Menu } from "semantic-ui-react"; 
import { Link, useNavigate } from "react-router-dom"

/**
 * Navbar component to handle website navigation and user authentication.
 * returns JSX representation of the Navbar.
 */

export const Navbar = () => {
    // Check if the user is logged in based on if the guest_session_id is present in the localStorage.
    const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
   
    // Access the navigation function from the React Router.
    const navigate = useNavigate();
    
    /**
     * Logout function to clear the guest session ID from localStorage and navigate to the authentication page.
     */
    const logout = () => {
        localStorage.removeItem("guest_session_id") !== null;
        navigate("/auth")
    };

    return (
        <Menu fixed="top" size="huge">
             <Menu.Item as={Link} to="/" style={{fontsize: "1.5rem"}}> 
             Home 
             </Menu.Item>

                <Menu.Item as={Link} to="/personalratings" style={{fontsize: "1.5rem"}}> 
                Personal Ratings
                </Menu.Item>

             <Menu.Menu position="right">
                {isLoggedIn ? (
                 <Menu.Item as={Button} style={{fontsize: "1.5rem"}} onClick={logout}> 
                 Logout 
                 </Menu.Item>
                ): (
                <Menu.Item as={Link} to="/Auth" style={{fontsize: "1.5rem"}}> Login </Menu.Item>
              )}
            </Menu.Menu>

        </Menu>
    )

}