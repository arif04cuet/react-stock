import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import SendEmail from './SendEmail';
import SendVolumnEmail from './SendVolumnEmail';
import StockList from './StockList';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="stock-list" element={<StockList />} />
        <Route path="send-email" element={<SendEmail />} />
        <Route path="send-volumn-email" element={<SendVolumnEmail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
