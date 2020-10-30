import React from 'react';
import { IconButton, Typography, Toolbar, CssBaseline, AppBar, createMuiTheme, ThemeProvider } from '@material-ui/core';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { Switch, Route } from 'react-router-dom';
import { Welcome, Home } from '../';
import './app.css';

const lightTheme = createMuiTheme();

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { theme: lightTheme };
  }

  handleClick = () => {
    if (this.state.theme === lightTheme) {
      this.setState({ theme: darkTheme });
    } else {
      this.setState({ theme: lightTheme });
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <AppBar position="fixed" className="app-bar">
          <Toolbar>
            <Typography variant="h6" noWrap>
              ACNH Dex
              </Typography>
            <IconButton style={{ color: 'white' }} onClick={this.handleClick}>
              <InvertColorsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <main>
          <Toolbar />
          <Switch>
            <Route exact path='/' component={Welcome}></Route>
            <Route path='/:id' component={Home}></Route>
          </Switch>
        </main>
      </ThemeProvider>
    );
  }
}

export default App;
