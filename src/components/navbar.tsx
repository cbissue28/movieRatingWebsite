import { Menu } from "semantic-ui-react"; 
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <Menu fixed="top" size="huge">
             <Menu.Item as={Link} to="/" style={{fontsize: "1.5rem"}}> Home </Menu.Item>
                <Menu.Item as={Link} to="/rated" style={{fontsize: "1.5rem"}}> Rated </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/Auth" style={{fontsize: "1.5rem"}}> Auth </Menu.Item>
            </Menu.Menu>

        </Menu>
    )

}