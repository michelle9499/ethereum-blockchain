import React from 'react'
import EthereumComponent from "./ethereum/ethereum.component";
import EthereumDetailsComponent from "./ethereum/ethereum-details.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";


// function App() {
//   return (
    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/" element={<EthereumComponent />} />
    //       <Route path="/details" element={<EthereumDetailsComponent />} />
    //   </Routes>
    // </BrowserRouter>
//   )
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<EthereumComponent />} />
            <Route path="/details" element={<EthereumDetailsComponent />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
