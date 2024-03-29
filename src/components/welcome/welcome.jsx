import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { GlobalContext } from '../../global/global-context';
import './welcome.scss';
import HerokuWarning from '../heroku-warning/heroku-warning';

function Welcome() {
  const { setSnackbarMessage, toggleLoadingSpinner } = React.useContext(GlobalContext);
  const [name, setName] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const addUser = (newUserName) => {
    axios.post('/api/users', { name: newUserName })
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
        toggleLoadingSpinner(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length && trimmedName.match('^[a-zA-Z0-9]*$') != null) {
      toggleLoadingSpinner(true);

      axios.get(`/api/users/${trimmedName}`)
        .then((res) => {
          if (res.data.length === 0) {
            addUser(trimmedName);
          } else {
            setSnackbarMessage('Name is already taken');
            toggleLoadingSpinner(false);
          }
        })
        .catch((err) => {
          setSnackbarMessage(err.toString());
          toggleLoadingSpinner(false);
        });
    } else {
      setSnackbarMessage('Name is invalid');
    }
  };

  return (
    <div>
      {!redirect
        ? (
          <div className="content flex-center">
            <div className="flex-center flex-column">
              <HerokuWarning/>
              <div className="info-container">
                <Typography variant="h4" gutterBottom>Welcome!</Typography>
                <Typography variant="h5" gutterBottom>
                  Use this app to keep track of your collectibles in Animal Crossing: New Horizons.
                </Typography>
              </div>
              <Typography variant="body1">Choose your address below.</Typography>
              <form className="name-form flex-center flex-column" autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex-center">
                  <Typography className="url" variant="body1">
                    {process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://acnh-dex.herokuapp.com/'}
                  </Typography>
                  <TextField id="name-input" inputProps={{ 'aria-label': 'user name' }} autoFocus placeholder="Name" variant="outlined" value={name} onChange={handleChange} />
                </div>
                <Button type="submit" className="submit-button" variant="contained" color="primary">Go</Button>
              </form>
              <Typography variant="body2" className="source-url">
                Created by
                {' '}
                <a href="https://github.com/arielturner/acnh-dex" target="_blank" rel="noreferrer">Ariel Turner</a>
              </Typography>
            </div>
          </div>
        )
        : <Redirect push to={{ pathname: `/${name}` }} />}
    </div>
  );
}

export default Welcome;
