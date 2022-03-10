import React from 'react'
import EthereumComponent from "./ethereum/ethereum.component";
import EthereumDetailsComponent from "./ethereum/ethereum-details.component";
import NavBarComponent from './ethereum//nav-bar.component';
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from 'web3';
import moment from 'moment'

//example hash for testing: 0x9de7053d6a50d295a58ba0d2943598850dff5bd5a1ce43c85b62500cc0bd987d

const web3 = new Web3(`${process.env.REACT_APP_RPC_HTTPURL}`)

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      hash: undefined,
      latestBlockList: [],
      latestTransactionList: [],
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

  calBurntFees(gasLimit, baseFeePerGas) {
    return gasLimit*baseFeePerGas;
  }

  calTxnFees(gasLimit, gasPrice){
    return gasLimit*gasPrice;
  }

  calBlockRewards(txnFee, burntFee) {
    return 2000000000000000000+txnFee-burntFee;
  }

  convertToBN(data){
    return web3.utils.toBN(data);
  }

  convertToEther(data, unit) {
    return web3.utils.fromWei(data, unit);
  }

  //get latest 10 blocks
  getLatestBlock() {
    for (let i=0; i < 10; i++) {
      web3.eth.getBlockNumber()
        .then(async(blockNumber) => {
          //get latest block number
          const number = blockNumber - i;
          const blockNumbers = await web3.eth.getBlock(number);
          const transactionCount = await web3.eth.getBlockTransactionCount(blockNumbers.hash);

          let latestBlockList = this.state.latestBlockList;
          let dateTime = moment(blockNumbers.timestamp*1000);

          //push recent block into array
          latestBlockList.push({
            number: blockNumbers.number,
            transactionCount: transactionCount,
            miner: blockNumbers.miner,
            time: dateTime.fromNow(),
            hash: blockNumbers.hash
          });
          
          //sorting block by number
          latestBlockList.sort((a, b) => {
            if (a.number > b.number) {return -1;}
            if (a.number < b.number) {return 1;}
            return 0;
          })

          //set state for recent block
          this.setState({latestBlockList: latestBlockList});
        });
    }
  }

  //get latest 10 transactions
  getLatestTransaction() {
    web3.eth.getBlockNumber().then((lastBlockNumber) => {
      web3.eth.getBlock(lastBlockNumber).then((block) => {
        for (let i=1; i <= 10; i++) {
          const lastTransaction = block.transactions[block.transactions.length - i];
            web3.eth.getTransaction(lastTransaction).then((transaction) => {
              // console.log(transaction)
            let latestTransactionList = this.state.latestTransactionList;
            let dateTime = moment(block.timestamp*1000);

            // push recent transaction into array
            latestTransactionList.push({
              hash: transaction.hash,
              from: transaction.from,
              to: transaction.to,
              time: dateTime.fromNow(),
              value: this.convertToEther(this.convertToBN(transaction.value), 'ether')
            });

            //set state for recent block
            this.setState({latestTransactionList: latestTransactionList});
          });
        }
      });
    });
  }

  //get block details by hash
  getBlockDetailsByHash = async(hash) => {
    const block = await web3.eth.getBlock(hash);
    const transactionCount = await web3.eth.getBlockTransactionCount(hash);
    const uncleCount = await web3.eth.getBlockUncleCount(hash);
    const gasPrice = await  web3.eth.getGasPrice();

    const dateTime = moment(block.timestamp*1000);

    //base fee per gas
    const baseFeePerGasInEther = this.convertToEther(this.convertToBN(block.baseFeePerGas), 'ether');
    const baseFeePerGasInGwei = this.convertToEther(this.convertToBN(block.baseFeePerGas), 'gwei');

    //burnt fees
    const burntFees = this.calBurntFees(block.gasLimit, block.baseFeePerGas);
    const burtFeesInEther = this.convertToEther(this.convertToBN(burntFees), 'ether');

    //txn fee
    const txnFee = this.calTxnFees(block.gasLimit, gasPrice);
    const txnFeeInEther = this.convertToEther(this.convertToBN(txnFee), 'ether')

    //block rewards
    const blockRewards = this.calBlockRewards(txnFee, burntFees);
    const blockRewardsInEther = this.convertToEther(this.convertToBN(blockRewards), 'ether');

    this.setState(prevState => {
      let blockDetails = Object.assign({}, prevState.blockDetails);
      blockDetails.number = block.number
      blockDetails.timestamp = `${dateTime.fromNow()} (${dateTime.format('YYYY-MM-DD hh:mm:ss a')})`
      blockDetails.transactions = `${transactionCount} transactions in this block`
      blockDetails.miner = block.miner
      blockDetails.blockReward = `${blockRewardsInEther} Ether (2 + ${txnFeeInEther} - ${burtFeesInEther})`
      blockDetails.unclesReward = uncleCount
      blockDetails.difficulty= block.difficulty
      blockDetails.totalDifficulty= parseInt(block.totalDifficulty).toLocaleString()
      blockDetails.size= `${block.size.toLocaleString()} bytes`
      blockDetails.gasUsed= block.gasUsed.toLocaleString()
      blockDetails.gasLimit= block.gasLimit.toLocaleString()
      blockDetails.baseFeePerGas= `${baseFeePerGasInEther} Ether (${baseFeePerGasInGwei} Gwei)`
      blockDetails.burntFees= `${burtFeesInEther} Ether`
      blockDetails.extraData= block.extraData
      blockDetails.hash= block.hash
      blockDetails.parentHash= block.parentHash
      blockDetails.sha3Uncles= block.sha3Uncles
      blockDetails.stateRoot= block.stateRoot
      blockDetails.nonce= block.nonce
      return { blockDetails }
    });
  }

  //handle search input change
  handleKeywordschange = (e) => {
    this.setState({hash: e.target.value})
  }

  componentDidMount(){
    const queryParams = new URLSearchParams(window.location.search);

    this.getLatestBlock();
    this.getLatestTransaction();
    this.getBlockDetailsByHash(queryParams.get('hash'));
  }

  render() {
    return(
      <div>
        <BrowserRouter>
          <NavBarComponent hash={this.state.hash} onChangeKeyword={this.handleKeywordschange}  getBlockDetailsByHash={this.getBlockDetailsByHash}/>
          <Routes>
              <Route path="/" element={<EthereumComponent latestBlockList={this.state.latestBlockList} latestTransactionList={this.state.latestTransactionList} getBlockDetailsByHash={this.getBlockDetailsByHash} />} />
              <Route exact path="/details" element={<EthereumDetailsComponent blockDetails={this.state.blockDetails}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
