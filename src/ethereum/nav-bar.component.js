import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

const NavBarComponent = () => {
    const navigate = useNavigate();

    const onSearch = (path) => {
        navigate(path);
    }

    return (
        <Navbar expand="lg" variant="light" bg="light">
            <div className='container'>
                <Navbar.Brand href="../"><h4>Ethereum Blockchain</h4></Navbar.Brand>
                <form className="d-flex">
                <input
                    type="search"
                    placeholder="Search by hash"
                    className="form-control me-2"
                />
                <Button variant="outline-secondary" onClick={() => onSearch("/details")}>Search</Button>
            </form>
            </div>
        </Navbar>
    );
}

export default NavBarComponent;