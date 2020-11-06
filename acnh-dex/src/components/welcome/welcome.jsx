import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { GlobalContext } from '../../global/global-context';
import './welcome.scss';

function Welcome() {
  const { setSnackbarMessage } = React.useContext(GlobalContext);
  const [name, setName] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (trimmedName.length && trimmedName.match('^[a-zA-Z0-9]*$') != null) {
      setName(trimmedName);
      setRedirect(true);
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
              <div className="info-container">
                <h1>Welcome!</h1>
                <h2>
                  Use this app to keep track of your collectibles in Animal Crossing: New Horizons.
                </h2>
                <h2>
                  Consumes
                  {' '}
                  <a href="http://acnhapi.com/" target="_blank" rel="noreferrer">ACNH API</a>
                  {' '}
                  for collectible metadata.
                </h2>
              </div>
              <div>Choose your address below.</div>
              <form className="top-margin flex-center flex-column" autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex-center">
                  <span className="url">http://localhost:3000/</span>
                  <TextField id="name-input" label="Name" variant="outlined" value={name} onChange={handleChange} />
                </div>
                <Button type="submit" className="top-margin" variant="contained" color="primary">Go</Button>
              </form>
            </div>
          </div>
        )
        : <Redirect push to={{ pathname: `/${name}` }} />}
    </div>
  );
}

export default Welcome;
