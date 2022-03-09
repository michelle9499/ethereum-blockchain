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
      blockDetails: {
        number: undefined,
        timestamp: '',
        transactions: undefined,
        miner: undefined,
        blockReward: undefined,
        unclesReward: undefined,
        difficulty: undefined,
        totalDifficulty: undefined,
        size: undefined,
        gasUsed: undefined,
        gasLimit: undefined,
        baseFeePerGas: undefined,
        burntFees: undefined,
        extraData: undefined,
        hash: undefined,
        parentHash: undefined,
        sha3Uncles: undefined,
        stateRoot: undefined,
        nonce: undefined
      }
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
        // console.log(n);
        // web3.eth.getTransactionFromBlock(n.number)
        //   .then((t) => {
        //     console.log(t)
        //   });
        
      });
  }
  
  //get block details by hash
  getBlockDetailsByHash(hash){
    web3.eth.getBlock(hash)
      .then((r) => {
        let dateTime = moment(r.timestamp*1000)

        //base fee per gas
        const baseFeePerGasToBN = web3.utils.toBN(r.baseFeePerGas)
        const baseFeePerGasEther = web3.utils.fromWei(baseFeePerGasToBN, 'ether')
        const baseFeePerGasGwei = web3.utils.fromWei(baseFeePerGasToBN, 'gwei')

        //burnt fees
        const burntFees = r.gasLimit*r.baseFeePerGas
        const burntFeesToBN = web3.utils.toBN(burntFees)
        const burntFeesToEther = web3.utils.fromWei(burntFeesToBN, 'ether')

        //txn fee
        const gasPrice = web3.eth.getGasPrice()
        gasPrice.then((gp) => {
          const txnFee = r.gasLimit * gp
          const txnFeeToBN = web3.utils.toBN(txnFee)
          const txnFeeToEther = web3.utils.fromWei(txnFeeToBN, 'ether')

          //block rewards
          const blockRewardToBN = web3.utils.toBN(2000000000000000000+txnFee-burntFees)
          const brFromWei= web3.utils.fromWei(blockRewardToBN, 'ether')

          web3.eth.getBlockTransactionCount(r.hash).then((transactionCount) => {
            web3.eth.getBlockUncleCount(r.hash).then((uncleCount) => {
              this.setState(prevState => {
                let blockDetails = Object.assign({}, prevState.blockDetails);
                blockDetails.number = r.number
                blockDetails.timestamp = `${dateTime.fromNow()} (${dateTime.format('YYYY-MM-DD hh:mm:ss a')})`
                blockDetails.transactions = `${transactionCount} transactions in this block`
                blockDetails.miner = r.miner
                blockDetails.blockReward = `${brFromWei} Ether (2 + ${txnFeeToEther} - ${burntFeesToEther})`
                blockDetails.unclesReward = uncleCount
                blockDetails.difficulty= r.difficulty
                blockDetails.totalDifficulty= parseInt(r.totalDifficulty).toLocaleString()
                blockDetails.size= `${r.size.toLocaleString()} bytes`
                blockDetails.gasUsed= r.gasUsed.toLocaleString()
                blockDetails.gasLimit= r.gasLimit.toLocaleString()
                blockDetails.baseFeePerGas= `${baseFeePerGasEther} Ether (${baseFeePerGasGwei} Gwei)`
                blockDetails.burntFees= `${burntFeesToEther} Ether`
                blockDetails.extraData= r.extraData
                blockDetails.hash= r.hash
                blockDetails.parentHash= r.parentHash
                blockDetails.sha3Uncles= r.sha3Uncles
                blockDetails.stateRoot= r.stateRoot
                blockDetails.nonce= r.nonce
                return { blockDetails }
              });
            })
          });
        });
      });
  }

  componentDidMount(){
    this.getLatestBlock();
    this.getLatestTransaction();
    this.getBlockDetailsByHash('0x1b43a0e61c5f1cecf0513653e09935f7236bbc3f794ccedc592cd5a4a49c661f');
  }

  render() {
    return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<EthereumComponent latestBlockList={this.state.latestBlockList}/>} />
            <Route path="/details" element={<EthereumDetailsComponent blockDetails={this.state.blockDetails}/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
