import React from 'react'
import EthereumComponent from "./ethereum/ethereum.component";
import EthereumBlockDetailsComponent from "./ethereum/ethereum-block-details.component";
import NavBarComponent from './ethereum//nav-bar.component';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from 'web3';
import moment from 'moment'
import EthereumTransactionDetailsComponent from './ethereum/ethereum-transaction-details.component';

//example hash for testing: 0x9de7053d6a50d295a58ba0d2943598850dff5bd5a1ce43c85b62500cc0bd987d

const web3 = new Web3(`${process.env.REACT_APP_RPC_HTTPURL}`)

class App extends React.Component {
  constructor() {
    super();
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
      },
      transactionDetails: {
        hash: undefined,
        status: undefined,
        blockNumber: undefined,
        blockHash: undefined,
        timestamp: '',
        from: undefined,
        to: undefined,
        value: undefined,
        transactionFee: undefined,
        gasPrice: undefined,
        gasLimitAndUsageByTxn: undefined,
        gasFee: undefined,
        burntFee: undefined,
        other: undefined
      },
      chartOptions: {
        title: {
          text: 'Ethereum Tansation History in 7 Days'
        },
        yAxis: {
          title: {
              text: 'Transactions Per Day'
          }
        },
        xAxis: {
          categories: [],
          tickInterval: 1
        },
        series: [{ 
          name: 'Total Transactions',
          data: [] 
        }]
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

  convertFromWei(data, unit) {
    return web3.utils.fromWei(data, unit);
  }

  //get latest 10 blocks
  getLatestBlock() {
    for (let i=0; i < 10; i++) {
      web3.eth.getBlockNumber()
        .then(async(blockNumber) => {
          //get latest block number
          let number = blockNumber - i;
          let blockNumbers = await web3.eth.getBlock(number);
          let transactionCount = await web3.eth.getBlockTransactionCount(blockNumbers.hash);
          let gasPrice = await web3.eth.getGasPrice();

          let latestBlockList = this.state.latestBlockList;
          let dateTime = moment(blockNumbers.timestamp*1000);

          //burnt fees
          let burntFees = this.calBurntFees(blockNumbers.gasLimit, blockNumbers.baseFeePerGas);

          //txn fee
          let txnFee = this.calTxnFees(blockNumbers.gasLimit, gasPrice);

          //block rewards
          let blockRewards = this.calBlockRewards(txnFee, burntFees);

          //push recent block into array
          latestBlockList.push({
            number: blockNumbers.number,
            transactionCount: transactionCount,
            miner: blockNumbers.miner,
            time: dateTime.fromNow(),
            hash: blockNumbers.hash,
            blockRewards: this.convertFromWei(this.convertToBN(blockRewards), 'ether')
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
          let lastTransaction = block.transactions[block.transactions.length - i];
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
              value: this.convertFromWei(this.convertToBN(transaction.value), 'ether')
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
    if(hash) {
      let block = await web3.eth.getBlock(hash);
      let transactionCount = await web3.eth.getBlockTransactionCount(hash);
      let uncleCount = await web3.eth.getBlockUncleCount(hash);
      let gasPrice = await  web3.eth.getGasPrice();

      let dateTime = moment(block.timestamp*1000);

      //base fee per gas
      let baseFeePerGasInEther = block.baseFeePerGas ? this.convertFromWei(this.convertToBN(block.baseFeePerGas), 'ether') : null;
      let baseFeePerGasInGwei = block.baseFeePerGas ? this.convertFromWei(this.convertToBN(block.baseFeePerGas), 'gwei') : null;

      //burnt fees
      let burntFees = (block.gasLimit && block.baseFeePerGas) ? this.calBurntFees(block.gasLimit, block.baseFeePerGas) : 0;
      let burtFeesInEther = this.convertFromWei(this.convertToBN(burntFees), 'ether');

      //txn fee
      let txnFee = (block.gasLimit && gasPrice) ? this.calTxnFees(block.gasLimit, gasPrice) : 0;
      let txnFeeInEther = this.convertFromWei(this.convertToBN(txnFee), 'ether')

      //block rewards
      let blockRewards = this.calBlockRewards(txnFee, burntFees);
      let blockRewardsInEther = this.convertFromWei(this.convertToBN(blockRewards), 'ether');

      this.setState(prevState => {
        let blockDetails = Object.assign({}, prevState.blockDetails);
        blockDetails.number = block.number
        blockDetails.timestamp = `${dateTime.fromNow()} (${dateTime.format('YYYY-MM-DD hh:mm:ss a')})`
        blockDetails.transactions = `${transactionCount ? transactionCount : 0} transactions in this block`
        blockDetails.miner = block.miner ? block.miner : '-'
        blockDetails.blockReward = `${blockRewardsInEther} Ether (2 + ${txnFeeInEther} - ${burtFeesInEther})`
        blockDetails.unclesReward = uncleCount ? uncleCount : 0
        blockDetails.difficulty = block.difficulty ? block.difficulty : 0;
        blockDetails.totalDifficulty= block.totalDifficulty ? parseInt(block.totalDifficulty).toLocaleString() : '-'
        blockDetails.size = block.size ? `${block.size.toLocaleString()} bytes` : '-'
        blockDetails.gasUsed = block.gasUsed ? block.gasUsed.toLocaleString() : '-'
        blockDetails.gasLimit = block.gasLimit ? block.gasLimit.toLocaleString() : '-'
        blockDetails.baseFeePerGas = block.baseFeePerGas ? `${baseFeePerGasInEther} Ether (${baseFeePerGasInGwei} Gwei)` : ''
        blockDetails.burntFees = `${burtFeesInEther} Ether`
        blockDetails.extraData = block.extraData ? block.extraData : '-'
        blockDetails.hash = block.hash ? block.hash : '-'
        blockDetails.parentHash = block.parentHash ? block.parentHash : '-'
        blockDetails.sha3Uncles = block.sha3Uncles ? block.sha3Uncles : '-'
        blockDetails.stateRoot = block.stateRoot ? block.stateRoot : '-'
        blockDetails.nonce = block.nonce ? block.nonce : '-'
        return { blockDetails }
      });
    }
  }

  //get transaction details by hash
  getTransactionDetailsByHash = async(hash) => {
    if(hash) {
      let transaction = await web3.eth.getTransaction(hash);
      let block = await web3.eth.getBlock(transaction.blockNumber);
      let transactionReceipt = await web3.eth.getTransactionReceipt(hash);

      const dateTime = moment(block.timestamp*1000);

      //gas price
      let gasPriceInEther = transaction.gasPrice ? this.convertFromWei(this.convertToBN(transaction.gasPrice), 'ether') : null;
      let gasPriceInGwei = transaction.gasPrice ? this.convertFromWei(this.convertToBN(transaction.gasPrice), 'gwei') : null;

      //txn fee
      let txnFee = (block.gasLimit && transaction.gasPrice) ? this.calTxnFees(block.gasLimit, transaction.gasPrice) : 0;
      let txnFeeInEther = this.convertFromWei(this.convertToBN(txnFee), 'ether');

      //gas fee
      let baseFeePerGasInGwei = block.baseFeePerGas ? this.convertFromWei(this.convertToBN(block.baseFeePerGas), 'gwei') : null;
      let maxFeePerGasInGwei = transaction.maxFeePerGas ? this.convertFromWei(this.convertToBN(transaction.maxFeePerGas), 'gwei'): null;
      let maxPriorityFeePerGasInGwei = transaction.maxPriorityFeePerGas ? this.convertFromWei(this.convertToBN(transaction.maxPriorityFeePerGas), 'gwei') : null;

      //burnt fees
      let burntFees = (block.gasLimit && block.baseFeePerGas) ? this.calBurntFees(block.gasLimit, block.baseFeePerGas) : 0;
      let burtFeesInEther = this.convertFromWei(this.convertToBN(burntFees), 'ether');

      // set state for transaction details
      this.setState(prevState => {
        let transactionDetails = Object.assign({}, prevState.transactionDetails);
        transactionDetails.hash = transaction.hash
        transactionDetails.status = transactionReceipt.status ? 'Success' : 'Failed'
        transactionDetails.blockNumber = transaction.blockNumber ? transaction.blockNumber : 0
        transactionDetails.blockHash = transaction.blockHash ? transaction.blockHash : '-'
        transactionDetails.timestamp = `${dateTime.fromNow()} (${dateTime.format('YYYY-MM-DD hh:mm:ss a')})`
        transactionDetails.from = transaction.from ? transaction.from : '-'
        transactionDetails.to = transaction.to ? transaction.to : '-'
        transactionDetails.value= transaction.value ? `${this.convertFromWei(this.convertToBN(transaction.value), 'ether')} Ether` : '-'
        transactionDetails.transactionFee= `${txnFeeInEther} Ether`
        transactionDetails.gasPrice= (gasPriceInEther ? `${gasPriceInEther} Ether` : '' )+ (gasPriceInGwei ? ` (${gasPriceInGwei} Gwei)` : '')
        transactionDetails.gasLimitAndUsageByTxn= `${transaction.gas ? transaction.gas.toLocaleString() : '-'}  |  ${transactionReceipt.gasUsed ? transactionReceipt.gasUsed.toLocaleString() : '-'}`
        transactionDetails.gasFee= (baseFeePerGasInGwei ? `Base: ${baseFeePerGasInGwei} Gwei` : '') + (maxFeePerGasInGwei ? `| Max: ${maxFeePerGasInGwei} Gwei` : '') +(maxPriorityFeePerGasInGwei ? `| Max Priority: ${maxPriorityFeePerGasInGwei}Gwei` : '')
        transactionDetails.burntFee= `${burtFeesInEther} Ether`
        transactionDetails.other= `Txn Type: ${transaction.type ? transaction.type : '-'} | Nonce: ${transaction.nonce ? transaction.nonce : 0} | Position: ${transaction.index ? transaction.index : '-'}`
        return { transactionDetails }
      });
    }
  }

  get7Days() {
    let days = []

    for (let i=0; i < 7; i++) {
      let day = moment().subtract(i, 'days');
      days.push(day.format('MMMM, DD'))
    }
    return days;
  }

  updateSeries = () => {
    this.setState({
      chartOptions: {
        xAxis: {
          categories: this.get7Days()
        },
        series: [
          { data: [1223143, 1190018, 1189898, 1204920, 1077844, 1147109, 1177640]}
        ]
      }
    });
  }

  //handle search input change
  handleKeywordschange = (e) => {
    this.setState({hash: e.target.value})
  }

  componentDidMount(){
    let queryParams = new URLSearchParams(window.location.search);

    this.getLatestBlock();
    this.getLatestTransaction();
    this.getBlockDetailsByHash(queryParams.get('block'));
    this.getTransactionDetailsByHash(queryParams.get('transaction'));
    this.updateSeries();
  }

  render() {
    return(
      <div>
        <BrowserRouter>
          <NavBarComponent 
            hash={this.state.hash} 
            onChangeKeyword={this.handleKeywordschange} 
            getBlockDetailsByHash={this.getBlockDetailsByHash}
            getTransactionDetailsByHash={this.getTransactionDetailsByHash}
          />
          <Routes>
              <Route path="/" element={<EthereumComponent 
                latestBlockList={this.state.latestBlockList} 
                latestTransactionList={this.state.latestTransactionList} 
                getBlockDetailsByHash={this.getBlockDetailsByHash} 
                getTransactionDetailsByHash={this.getTransactionDetailsByHash} 
                chartOptions={this.state.chartOptions}
              />} />
              <Route path="/block-details" element={<EthereumBlockDetailsComponent blockDetails={this.state.blockDetails}/>} />
              <Route path="/transaction-details" element={<EthereumTransactionDetailsComponent transactionDetails={this.state.transactionDetails}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
