import './heroku-warning.scss';
import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

function HerokuWarning() {
  return (
    <Alert className="heroku-warning" severity="warning">
      <AlertTitle>Warning</AlertTitle>
      This app will go offline on November 28, 2022, as Heroku is ending its free tier.
      <br/>
      Shoot me an email at arieltrnr@gmail.com if you want me to keep hosting it.
    </Alert>
  );
}

export default HerokuWarning;
