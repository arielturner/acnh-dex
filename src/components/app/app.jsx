import './app.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';
import Welcome from '../welcome/welcome';
import Home from '../home/home';

function App() {
  return (
    <main>
      <Toolbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/:id" component={Home} />
      </Switch>
    </main>
  );
}

export default App;
