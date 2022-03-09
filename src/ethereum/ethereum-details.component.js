import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarComponent from './nav-bar.component';
import { Card } from 'react-bootstrap';

const EthereumDetailsComponent = () => {
    return (
        <div>
            <NavBarComponent />
            <div className='container'>
                <Card className='my-5'>
                    <Card.Header>
                        <p className='mb-0'><span className='h3'>Block</span> <span className='h5 text-secondary'>#123456</span></p>
                    </Card.Header>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-3 mb-3'>Block Height:</div>
                            <div className='col-9 mb-3'>123456</div>
                            <hr/>
                            <div className='col-3 mb-3'>Timestamp:</div>
                            <div className='col-9 mb-3'>5 mins ago (Mar-09-2022 01:58:04 AM +UTC)</div>
                            <hr/>
                            <div className='col-3 mb-3'>Transactions:</div>
                            <div className='col-9 mb-3'>256 transactions and 189 contract internal transactions in this block</div>
                            <hr/>
                            <div className='col-3 mb-3'>Mined by:</div>
                            <div className='col-9 mb-3'>0x829bd824b016326a401d083b33d092293333a830 (F2Pool Old) in 1 secs</div>
                            <hr/>
                            <div className='col-3 mb-3'>Block Reward:</div>
                            <div className='col-9 mb-3'>2.071390026072561117 Ether (2 + 0.887745958518115345 - 0.816355932445554228)</div>
                            <hr/>
                            <div className='col-3 mb-3'>Uncles Reward:</div>
                            <div className='col-9 mb-3'>0</div>
                            <hr/>
                            <div className='col-3 mb-3'>Difficulty:</div>
                            <div className='col-9 mb-3'>12,491,022,224,873,051</div>
                            <hr/>
                            <div className='col-3 mb-3'>Total Difficulty:</div>
                            <div className='col-9 mb-3'>43,312,235,093,337,716,358,232</div>
                            <hr/>
                            <div className='col-3 mb-3'>Size:</div>
                            <div className='col-9 mb-3'>147,709 bytes</div>
                            <hr/>
                            <div className='col-3 mb-3'>Gas Used:</div>
                            <div className='col-9 mb-3'>23,986,249 (79.80%)</div>
                            <hr/>
                            <div className='col-3 mb-3'>Gas Limit:</div>
                            <div className='col-9 mb-3'>30,058,590</div>
                            <hr/>
                            <div className='col-3 mb-3'>Base Fee Per Gas:</div>
                            <div className='col-9 mb-3'>0.000000034034330772 Ether (34.034330772 Gwei)</div>
                            <hr/>
                            <div className='col-3 mb-3'>Burnt Fees:</div>
                            <div className='col-9 mb-3'>0.816355932445554228 Ether</div>
                            <hr/>
                            <div className='col-3 mb-3'>Extra Data:</div>
                            <div className='col-9 mb-3'>七彩神仙鱼H#! (Hex:0xe4b883e5bda9e7a59ee4bb99e9b1bc482321)</div>
                            <hr/>
                            <div className='col-3 mb-3'>Hash:</div>
                            <div className='col-9 mb-3'>0xede98c617add97e41ca0436ceeeb40d8161f2ebb56e52561418cbac8c0390be6</div>
                            <hr/>
                            <div className='col-3 mb-3'>Parent Hash:</div>
                            <div className='col-9 mb-3'>0xfa4b9852ceb9f982455c2f2c109336f2fb10e1c6604ad6a56d2190c2158bcd93</div>
                            <hr/>
                            <div className='col-3 mb-3'>Sha3Uncles:</div>
                            <div className='col-9 mb-3'>0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347</div>
                            <hr/>
                            <div className='col-3 mb-3'>StateRoot:</div>
                            <div className='col-9 mb-3'>0x319cb1bd5c04b02a5e9bc497eb62effb02e5959ac370cb20e978430bf9e3d75f</div>
                            <hr/>
                            <div className='col-3 mb-3'>Nonce:</div>
                            <div className='col-9 mb-3'>0xb170711f1b5f75ef</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default EthereumDetailsComponent;