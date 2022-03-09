import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarComponent from './nav-bar.component';
import { Card } from 'react-bootstrap';

const EthereumDetailsComponent = (props) => {
    return (
        <div>
            <NavBarComponent />
            <div className='container'>
                <Card className='my-5'>
                    <Card.Header>
                        <p className='mb-0'><span className='h3'>Block</span> <span className='h5 text-secondary'>#{props.blockDetails.number}</span></p>
                    </Card.Header>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-3 mb-3'>Block Height:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.number}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Timestamp:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.timestamp}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Transactions:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.transactions}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Mined by:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.miner}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Block Reward:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.blockReward}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Uncles Reward:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.unclesReward}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Difficulty:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.difficulty}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Total Difficulty:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.totalDifficulty}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Size:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.size}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Gas Used:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.gasUsed}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Gas Limit:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.gasLimit}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Base Fee Per Gas:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.baseFeePerGas}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Burnt Fees:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.burntFees}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Extra Data:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.extraData}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Hash:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.hash}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Parent Hash:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.parentHash}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Sha3Uncles:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.sha3Uncles}</div>
                            <hr/>
                            <div className='col-3 mb-3'>StateRoot:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.stateRoot}</div>
                            <hr/>
                            <div className='col-3 mb-3'>Nonce:</div>
                            <div className='col-9 mb-3'>{props.blockDetails.nonce}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default EthereumDetailsComponent;