import { useEffect, useState } from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import filterFactory, { numberFilter, selectFilter, textFilter, Comparator } from 'react-bootstrap-table2-filter';

import BootstrapTable from 'react-bootstrap-table-next';
import ExpandedRow from './ExpandedRow';
import { Spinner } from 'react-bootstrap';
import TableCaption from './TableCaption';

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
        paid_up_capital: Number(getMeta(fundamental, 'paid_up_capital')),
        earning_per_share: Number(getMeta(fundamental, 'earning_per_share')),
        net_asset_val_per_share: Number(getMeta(fundamental, 'net_asset_val_per_share')),
        reserve_and_surp: Number(getMeta(fundamental, 'reserve_and_surp')),
        total_securities: Number(getMeta(fundamental, 'total_no_securities')),
        share_percentage_govt: Number(getMeta(fundamental, 'share_percentage_govt')),
        share_percentage_institute: Number(getMeta(fundamental, 'share_percentage_institute')),
        close_price: Number(instrument?.close),
        yearly_high: Number(instrument?.yearly_high),
        yearly_low: Number(instrument?.yearly_low),
        p_yl: Number((Number(instrument?.close) - Number(instrument?.yearly_low)).toFixed(2)),
        year_end: (getMeta(fundamental, 'year_end') + '').includes('-31') ? 1 : 2
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

  const endYearOptions = {
    1: 'Dec 31',
    2: 'June 30'
  }
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
      filter: numberFilter()
    },
    {
      dataField: 'earning_per_share',
      text: 'EPS',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'net_asset_val_per_share',
      text: 'NAV',
      sort: true,
      filter: numberFilter()
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
    },
    {
      dataField: 'share_percentage_govt',
      text: 'Govt %',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'share_percentage_institute',
      text: 'Institute %',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'close_price',
      text: 'Price',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'yearly_high',
      text: 'YH',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'yearly_low',
      text: 'YL',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'p_yl',
      text: 'P vs YL',
      sort: true,
      filter: numberFilter()
    },
    {
      dataField: 'year_end',
      text: 'Year End',
      sort: true,
      formatter: cell => endYearOptions[cell],
      filter: selectFilter({
        options: endYearOptions
      })
    }
  ];

  const expandRow = {
    renderer: row => <ExpandedRow row={row} />,
    showExpandColumn: true
  };



  if (isLoading)
    return (
      <div class="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )

  return (
    <div className="container-fluid">
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
            noDataIndication="Loading.."
            filter={filterFactory()}
            wrapperClasses="table-responsive"
            caption={<TableCaption items={stocks} />}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
