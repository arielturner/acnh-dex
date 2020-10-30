import React from 'react';
import { Redirect } from "react-router-dom";
import './welcome.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SharedSnackbarConsumer } from '../shared-snackbar/shared-snackbar-context';

export default class Welcome extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: '', redirect: false };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  isNameValid = () => {
    if (this.state.name && this.state.name.trim().match("^[a-zA-Z0-9]*$") != null) {
      this.setState({ redirect: true })
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        {!this.state.redirect ?
          <div className="content flex-center">
            <div className="flex-center flex-column">
              <div className="info-container">
                <h1>Welcome!</h1>
                <h2>Use this app to keep track of your collectibles in Animal Crossing: New Horizons.</h2>
                <h2>Consumes <a href="http://acnhapi.com/" target="_blank" rel="noreferrer">ACNH API</a> for collectible metadata.</h2>
              </div>
              <div className="top-margin">Choose your address below.</div>
              <form className="top-margin flex-center" autoComplete="off">
                <span>http://localhost:3000/</span>
                <TextField id="name-input" label="Name" variant="outlined" value={this.state.name} onChange={this.handleChange} />
              </form>
              <SharedSnackbarConsumer>
                {({ openSnackbar }) => (
                  <Button className="top-margin" variant="contained" color="primary" onClick={() => { if (!this.isNameValid()) openSnackbar('Name is invalid.') }}>Go</Button>
                )}
              </SharedSnackbarConsumer>
            </div>
          </div>
          :
          <Redirect to={{ pathname: `/${this.state.name}` }} />
        }
      </div>
    );
  }
}
