import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import TotalStock from './TotalStock';

function App() {

  const [stocks, setStocks] = useState([])

  const getMeta = (stock, meta) => {
    return Boolean(stock[meta]?.length) ? stock[meta][0].meta_value : 0
  }

  useEffect(() => {
    const url = 'https://api.stocknow.com.bd/v1/fundamentals';
    fetch(url)
      .then(res => res.json())
      .then(res => {

        const items = [];

        Object.keys(res).forEach(code => {

          const stock = res[code];

          const item = {
            code: code,
            paid_up_capital: getMeta(stock, 'paid_up_capital'),
            earning_per_share: getMeta(stock, 'earning_per_share'),
            net_asset_val_per_share: getMeta(stock, 'net_asset_val_per_share'),
            reserve_and_surp: getMeta(stock, 'reserve_and_surp'),
            total_securities: getMeta(stock, 'total_no_securities')
              + '|' + getMeta(stock, 'share_percentage_director')
              + '|' + getMeta(stock, 'share_percentage_foreign')
              + '|' + getMeta(stock, 'share_percentage_govt')
              + '|' + getMeta(stock, 'share_percentage_institute')
              + '|' + getMeta(stock, 'share_percentage_public'),
          }

          items.push(item);

        });

        setStocks(items)

      })
      .catch(e => console.log(e.response))
  }, [])

  const columns = [
    {
      dataField: 'code',
      text: 'Code',
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
      text: 'TS = D-F-G-I-P',
      sort: true,
      formatter: (cell, row) => <TotalStock row={row} cell={cell} />
    }
  ];


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <BootstrapTable keyField='code' data={stocks} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default App;
