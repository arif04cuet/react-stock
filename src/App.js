import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import TotalStock from './TotalStock';
import ExpandedRow from './ExpandedRow';

function App() {

  const [instruments, setInstruments] = useState([])
  const [fundamentals, setFundamentals] = useState([])
  const [stocks, setStocks] = useState([])
  const [sectors, setSectors] = useState([])

  const getMeta = (stock, meta) => {
    return stock && meta in stock ? stock[meta][0]?.meta_value : 0
  }

  const formatItems = () => {

    const items = [];


    Object.keys(instruments).forEach(code => {

      const fundamental = fundamentals[code];
      const instrument = instruments[code];
      console.log(fundamental);
      const item = {
        code: code,
        category: instrument.category,
        paid_up_capital: getMeta(fundamental, 'paid_up_capital'),
        earning_per_share: getMeta(fundamental, 'earning_per_share'),
        net_asset_val_per_share: getMeta(fundamental, 'net_asset_val_per_share'),
        reserve_and_surp: getMeta(fundamental, 'reserve_and_surp'),
        total_securities: getMeta(fundamental, 'total_no_securities')
      }

      items.push(item);

    });

    setStocks(items)

  }

  const fectStockData = async () => {

    const apiBase = 'https://api.stocknow.com.bd/v1';
    const fundamentalApi = apiBase + '/fundamentals';
    const instrumentApi = apiBase + '/instruments';
    const sectorApi = apiBase + '/sectors';

    let response;

    response = await fetch(instrumentApi);
    const instrumentsData = await response.json();
    setInstruments(instrumentsData);

    response = await fetch(fundamentalApi);
    const fundamentalsData = await response.json();
    setFundamentals(fundamentalsData);

    response = await fetch(sectorApi);
    const sectorsData = await response.json();
    setSectors(sectorsData);


    formatItems();
  }

  useEffect(() => {

    fectStockData()

  }, [])

  const columns = [
    {
      dataField: 'code',
      text: 'Code',
      sort: true
    },
    {
      dataField: 'category',
      text: 'Category',
      sort: true
    },
    {
      dataField: 'paid_up_capital',
      text: 'PUC',
      sort: true
    },
    {
      dataField: 'earning_per_share',
      text: 'EPS',
      sort: true
    },
    {
      dataField: 'net_asset_val_per_share',
      text: 'NAV',
      sort: true
    },
    {
      dataField: 'reserve_and_surp',
      text: 'Reserve',
      sort: true
    },
    {
      dataField: 'total_securities',
      text: 'TS',
      sort: true
    }
  ];

  const expandRow = {
    renderer: row => <ExpandedRow row={row} />,
    showExpandColumn: true
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <BootstrapTable
            keyField='code'
            data={stocks}
            columns={columns}
            striped
            hover
            condensed
            expandRow={expandRow}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
