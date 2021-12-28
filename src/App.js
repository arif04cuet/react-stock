import { useEffect, useState } from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { numberFilter, selectFilter, textFilter, Comparator } from 'react-bootstrap-table2-filter';

import BootstrapTable from 'react-bootstrap-table-next';
import ExpandedRow from './ExpandedRow';

function App() {

  const [isLoading, setIsLoading] = useState(true);

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

    fetch(instrumentApi)
      .then(res => res.json())
      .then(res => {
        setInstruments(res)
        fetch(fundamentalApi)
          .then(res => res.json())
          .then(res => {
            setFundamentals(res);
            fetch(sectorApi)
              .then(res => res.json())
              .then(res => {
                setSectors(res);
                setIsLoading(false);
              })
          })

      });

  }

  let codeF, pucF;

  useEffect(() => {
    if (isLoading)
      fectStockData()
    else
      formatItems();
  }, [isLoading])

  const columns = [
    {
      dataField: 'code',
      text: 'Code',
      sort: true,
      filter: textFilter({
        getFilter: (filter) => {
          codeF = filter;
        }
      })
    },
    {
      dataField: 'category',
      text: 'Category',
      sort: true,
      filter: selectFilter({
        options: {
          'A': 'A',
          'B': 'B',
          'N': 'N',
          'Z': 'Z'
        }
      })
    },
    {
      dataField: 'paid_up_capital',
      text: 'PUC',
      sort: true,
      filter: numberFilter({
        getFilter: (filter) => {
          pucF = filter;
        }
      })
    },
    {
      dataField: 'earning_per_share',
      text: 'EPS',
      sort: true,
      filter: numberFilter({
        getFilter: (filter) => {

        }
      })
    },
    {
      dataField: 'net_asset_val_per_share',
      text: 'NAV',
      sort: true,
      filter: numberFilter({
        getFilter: (filter) => {

        }
      })
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
          <div>
            <button
              className="btn btn-danger"
              onClick={e => {
                console.log(typeof codeF);
                codeF('')
                pucF('')
              }}>
              Clear
            </button>
          </div>
          <BootstrapTable
            keyField='code'
            data={stocks}
            columns={columns}
            striped
            hover
            condensed
            expandRow={expandRow}
            noDataIndication="Loading.."
            filter={filterFactory()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
