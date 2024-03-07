import { Button, Menu } from "semantic-ui-react"; 
import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {

    const isLoggedIn = localStorage.getItem("guest_session_id") !== null;

    const navigate = useNavigate();

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