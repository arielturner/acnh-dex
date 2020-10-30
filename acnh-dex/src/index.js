import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import SharedSnackbarProvider from './components/shared-snackbar/shared-snackbar-context'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <SharedSnackbarProvider>
      <App />
    </SharedSnackbarProvider>
  </BrowserRouter>
), document.getElementById('root')
);