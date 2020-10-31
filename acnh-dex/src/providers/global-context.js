import React from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const GlobalContext = React.createContext();

export default function GlobalContextProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const setSnackbarMessage = (text) => {
    setMessage(text);
    setOpen(true);
  }

  const [context] = React.useState({
    setSnackbarMessage
  });

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  };

  return (
    <GlobalContext.Provider value={context}>
      {children}
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
          </IconButton>
        ]}
      >
      </Snackbar>
    </GlobalContext.Provider>
  );
};
