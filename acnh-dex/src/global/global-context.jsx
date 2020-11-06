import './global-context.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Snackbar, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const GlobalContext = React.createContext();

function GlobalContextProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const toggleLoadingSpinner = (value) => {
    setLoading(value);
  };

  const setSnackbarMessage = (text) => {
    setMessage(text);
    setOpen(true);
  };

  const [context] = React.useState({
    toggleLoadingSpinner,
    setSnackbarMessage,
  });

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  };

  return (
    <GlobalContext.Provider value={context}>
      {children}

      {loading
        ? (
          <div className="spinner-container">
            <CircularProgress color="secondary" />
          </div>
        )
        : null}

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={[
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>,
        ]}
      />
    </GlobalContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.element,
};
GlobalContextProvider.defaultProps = {
  children: null,
};

export default GlobalContextProvider;
