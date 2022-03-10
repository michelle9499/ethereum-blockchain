import React from 'react';
import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const options = {
    title: {
      text: 'Ethereum Tansation History in 7 Days'
    },
    series: [{
      data: [1, 2, 3]
    }]
}
  
const EthereumComponent = (props) => {
    return (
        <div>
            <div className='container'>
                <div className="my-4">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
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
                                                    <Link to={{pathname:'/details', search:`?hash=${r.hash}`}} onClick={() => props.getBlockDetailsByHash(r.hash)}>{r.number}</Link>
                                                    <p className='mb-0 text-secondary small'>{r.time}</p>
                                                </td>
                                                <td>
                                                    <p className='mb-0'>Miner <span>({r.miner})</span></p> 
                                                    <p className='mb-0 text-secondary small'>{r.transactionCount} txns</p>
                                                </td>
                                                <td></td>
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
                                                <td>
                                                    <Link to={{pathname:'/details', search:`?hash=${r.hash}`}} onClick={() => props.getBlockDetailsByHash(r.hash)} className="text-truncate">{r.hash}</Link>
                                                    <p className='mb-0 text-secondary small'>{r.time}</p>
                                                </td>
                                                <td>
                                                    <p className='mb-0'>From: <span>{r.from}</span></p> 
                                                    <p className='mb-0'>To: <span>{r.to}</span></p>
                                                </td>
                                                <td>
                                                    <p className='mb-0'><span>{r.value} Eth</span></p> 
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