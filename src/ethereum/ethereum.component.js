import React from 'react';
import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EthereumComponent = (props) => {
    return (
        <div>
            <div className='container'>
                <div className="my-4">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={props.chartOptions}
                    />
                </div>
                <div className='row my-4'>
                    <div className='col-6'>
                        <Card>
                            <Card.Body>
                                <h5>Latest Block</h5>
                                <hr />
                                <Table responsive>
                                    <tbody>
                                        {props.latestBlockList.map((r, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <Link to={{pathname:'/block-details', search:`?block=${r.hash}`}} 
                                                        onClick={() => props.getBlockDetailsByHash(r.hash)} className='text-decoration-none'>{r.number}
                                                    </Link>
                                                    <p className='mb-0 text-secondary small'>{r.time}</p>
                                                </td>
                                                <td>
                                                    <p className='mb-0 text-truncate'>Miner ({r.miner})</p> 
                                                    <p className='mb-0 text-secondary small'>{r.transactionCount} txns</p>
                                                </td>
                                                <td className='text-right'>
                                                    <p className='mb-0 text-secondary small'>{r.blockRewards} Eth</p> 
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='col-6'>
                        <Card>
                            <Card.Body>
                                <h5>Latest Transaction</h5>
                                <hr />
                                <Table responsive>
                                    <tbody>
                                    {props.latestTransactionList.map((r, i) => (
                                            <tr key={i}>
                                                <td className='text-truncate'>
                                                    <Link to={{pathname:'/transaction-details', search:`?transaction=${r.hash}`}} 
                                                        onClick={() => props.getTransactionDetailsByHash(r.hash)} className="text-truncate text-decoration-none">{r.hash}
                                                    </Link>
                                                    <p className='mb-0 text-secondary small'>{r.time}</p>
                                                </td>
                                                <td>
                                                    <p className='mb-0 text-truncate small'>From: {r.from}</p> 
                                                    <p className='mb-0 text-truncate small'>To: {r.to}</p>
                                                </td>
                                                <td className='text-right'>
                                                    <p className='mb-0 text-secondary small'>{r.value} Eth</p> 
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EthereumComponent;