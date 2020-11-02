import './app.css';
import React from 'react';
import teal from '@material-ui/core/colors/teal';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import {
  IconButton, Typography, Toolbar, CssBaseline, AppBar, createMuiTheme, ThemeProvider, Tooltip,
} from '@material-ui/core';
import {
  Welcome, Home,
} from '..';

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

export default function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme);

  const handleClick = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
    localStorage.setItem('theme', theme.palette.type);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <Typography variant="h6" noWrap>
            ACNH Dex
          </Typography>
          <Tooltip title="Toggle theme">
            <IconButton style={{ color: 'white' }} onClick={handleClick}>
              <InvertColorsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <main>
        <Toolbar />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/:id" component={Home} />
        </Switch>
      </main>
    </ThemeProvider>
  );
}
