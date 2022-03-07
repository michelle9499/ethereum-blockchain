import EthereumComponent from "./ethereum/ethereum.component";
import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  onSearch = () =>{ 
    console.log('onSearch')
  }

  render() {
    return(
      <div>
        <Navbar expand="lg" variant="light" bg="light">
                <div className='container'>
                    <Navbar.Brand href="#"><h4>Ethereum Blockchain</h4></Navbar.Brand>
                    <form className="d-flex">
                    <input
                        type="search"
                        placeholder="Search by hash"
                        className="form-control me-2"
                    />
                    <Button variant="outline-secondary" onClick={this.onSearch}>Search</Button>
                </form>
                </div>
            </Navbar>
            <EthereumComponent />
      </div>
    )
  }
}

export default App;
