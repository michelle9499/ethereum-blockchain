import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EthereumTransactionDetailsComponent = (props) => {
    return (
        <div>
            <div className='container'>
                <Card className='my-5'>
                    <Card.Header>
                        <h3 className='mb-0'>Transaction Details</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-3 mb-3'>Transaction Hash:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.hash}</div>

                            <div className='col-3 mb-3'>Status:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.status}</div>
                            
                            <div className='col-3 mb-3'>Block:</div>
                            <div className='col-9 mb-3'>
                                <Link to={{pathname:'/block-details', search:`?block=${props.transactionDetails.blockHash}`}} 
                                    onClick={() => props.getBlockDetailsByHash(props.transactionDetails.blockHash)} className='text-decoration-none'>{props.transactionDetails.blockNumber}
                                </Link>
                            </div>
                            
                            <div className='col-3 mb-3'>Timestamp:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.timestamp}</div>
                            <hr/>
                            <div className='col-3 mb-3'>From:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.from}</div>
                            
                            <div className='col-3 mb-3'>To:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.to}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Value:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.value}</div>
                            
                            <div className='col-3 mb-3'>Transaction Fee:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.transactionFee}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Gas Price:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.gasPrice}</div>
                            
                            <div className='col-3 mb-3'>Gas Limit & Usage by Txn:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.gasLimitAndUsageByTxn}</div>
                            
                            <div className='col-3 mb-3'>Gas Fees:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.gasFee}</div>
                            
                            <div className='col-3 mb-3'>Burnt Fees:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.burntFee}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Others:</div>
                            <div className='col-9 mb-3'>{props.transactionDetails.other}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default EthereumTransactionDetailsComponent;