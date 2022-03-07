import './ethereum.style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const options = {
    title: {
      text: 'Ethereum Tansation History in 7 Days'
    },
    series: [{
      data: [1, 2, 3]
    }]
  }

  
const EthereumComponent = () => {
    return (
        <div className='container'>
            <div className="my-4">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
            <div className='row'>
                <div className='col-6'>
                    <Card>
                        <Card.Body>
                            <h5>Latest Block</h5>
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
    );
}

export default EthereumComponent;