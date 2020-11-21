import './global-context.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { teal, lightBlue } from '@material-ui/core/colors';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import {
  IconButton, Snackbar, CircularProgress, ThemeProvider, AppBar, CssBaseline, createMuiTheme,
  Toolbar, Tooltip, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const GlobalContext = React.createContext();

const lightTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
    type: 'light',
  },
});
const darkTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
    type: 'dark',
  },
});

function GlobalContextProvider({ children }) {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleThemeClick = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
    localStorage.setItem('theme', theme.palette.type);
  };

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

  const handleSnackbarClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  };

  return (
    <GlobalContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" className="app-bar">
          <Toolbar>
            <Typography variant="h6" noWrap>
              ACNH Dex
            </Typography>
            <Tooltip title="Toggle theme">
              <IconButton style={{ color: 'white' }} onClick={handleThemeClick}>
                <InvertColorsIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
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
          onClose={handleSnackbarClose}
          message={message}
          action={(
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        />
      </ThemeProvider>
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
