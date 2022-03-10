import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

const NavBarComponent = (props) => {
    const navigate = useNavigate();

    function onSearch() {
        props.getBlockDetailsByHash(props.hash)
        navigate(`/details?hash=${props.hash}`);
    }

    return (
        <Navbar expand="lg" variant="light" bg="light">
            <div className='container'>
                <Navbar.Brand href="../"><h4>Ethereum Blockchain</h4></Navbar.Brand>
                <form className="d-flex">
                    <input
                        type="text"
                        placeholder="Search by hash"
                        className="form-control me-2"
                        name='search'
                        autoComplete='off'
                        onChange={props.onChangeKeyword}
                    />
                    <Button variant="outline-secondary" onClick={onSearch}>Search</Button>
                </form>
            </div>
        </Navbar>
    );
}

export default NavBarComponent;