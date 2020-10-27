import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ToCatch from '../to-catch/to-catch';
import Caught from '../caught/caught';

export default function Main() {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={ToCatch}></Route>
      <Route exact path='/caught' component={Caught}></Route>
    </Switch>
  );
}
