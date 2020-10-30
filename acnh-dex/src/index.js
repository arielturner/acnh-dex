import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import GlobalContextProvider from './providers/global-context'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </BrowserRouter>
), document.getElementById('root')
);