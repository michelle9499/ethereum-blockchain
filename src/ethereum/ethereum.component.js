import React from 'react';
import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Table, Card } from 'react-bootstrap';
import NavBarComponent from './nav-bar.component';

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
            <NavBarComponent />
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
                                                    <span>{r.number}</span> 
                                                    <p className='mb-0 text-secondary small'>{r.time}</p>
                                                </td>
                                                <td>
                                                    <p className='mb-0'>Miner <span>({r.miner})</span></p> 
                                                    <p className='mb-0 text-secondary small'>{r.transactionCount} txns</p>
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
                                        <tr>
                                            <td>1433630</td>
                                            <td>Miner Hiveon Pol</td>
                                            <td>2.09742 Eth</td>
                                        </tr>
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