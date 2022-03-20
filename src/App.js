import { useEffect, useState } from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <div>
      <nav
        style={{

          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/stock-list">Stock List</Link>
        <Link to="/send-email">send email</Link>
        <Link to="/send-volumn-email">send volumn email</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
