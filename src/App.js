import React from 'react'
import EthereumComponent from "./ethereum/ethereum.component";
import EthereumDetailsComponent from "./ethereum/ethereum-details.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from 'web3';
import moment from 'moment'

const web3 = new Web3(`${process.env.REACT_APP_RPC_HTTPURL}`)

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latestBlockList: [],
    }
  }

  //get latest 10 blocks
  getLatestBlock(){
    for (let i=0; i < 10; i++) {
      //get latest block number
      web3.eth.getBlockNumber()
        .then((n) => {
          const number = n - i
          web3.eth.getBlock(number)
            .then((lb) => {
              let latestBlockList = this.state.latestBlockList;
              let dateTime = moment(lb.timestamp*1000)

              //get block transaction count
              web3.eth.getBlockTransactionCount(lb.hash).then((r) => {

                //push recent block into array
                latestBlockList.push({
                  number: lb.number,
                  transactionCount: r,
                  miner: lb.miner,
                  time: dateTime.fromNow()
                });
                
                //sorting block by number
                latestBlockList.sort((a, b) => {
                  if (a.number > b.number) {return -1;}
                  if (a.number < b.number) {return 1;}
                  return 0;
                })

                //set state for recent block
                this.setState({latestBlockList: latestBlockList});
              })
          });
        });
    }
  }

  //get latest 10 transactions
  getLatestTransaction() {
    web3.eth.getBlockNumber()
      .then((n) => {
        console.log(n)
        // web3.eth.getTransactionFromBlock(n.number)
        //   .then((t) => {
        //     console.log(t)
        //   });
        
      });
    
    
  }

  componentDidMount(){
    this.getLatestBlock();
    this.getLatestTransaction();
  }

  render() {
    return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<EthereumComponent latestBlockList={this.state.latestBlockList}/>} />
            <Route path="/details" element={<EthereumDetailsComponent />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
