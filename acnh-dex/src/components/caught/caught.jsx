import React from 'react';
import axios from 'axios';
import './caught.scss';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  Paper, Tabs, Tab, Fab, Tooltip,
} from '@material-ui/core';
import { GlobalContext } from '../../providers/global-context';
import CaughtCollectibles from '../caught-collectibles/caught-collectibles';

const baseUrl = 'http://acnhapi.com/v1a';

function AddButton({ tabIndex }) {
  let type;
  if (tabIndex === 0) {
    type = 'bug';
  } else if (tabIndex === 1) {
    type = 'fish';
  } else {
    type = 'sea creature';
  }

  return (
    <Tooltip title={`Add ${type}`} placement="bottom">
      <Fab className="add-button" color="secondary" aria-label={`add ${type}`}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}

AddButton.propTypes = {
  tabIndex: PropTypes.number.isRequired,
};

class Caught extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0, fish: [], bugs: [], seaCreatures: [],
    };
  }

  componentDidMount() {
    const { setSnackbarMessage, toggleLoadingSpinner } = this.context;
    toggleLoadingSpinner(true);
    const component = this;

    Promise.all([axios.get(`${baseUrl}/fish`), axios.get(`${baseUrl}/bugs`), axios.get(`${baseUrl}/sea`)])
      .then((values) => {
        component.setAvailable(values[0].data, values[1].data, values[2].data);
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
      })
      .finally(() => {
        toggleLoadingSpinner(false);
      });
  }

  setAvailable(f, b, sc) {
    this.setState({
      fish: f,
      bugs: b,
      seaCreatures: sc,
    });
  }

  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  render() {
    const {
      tabIndex, fish, bugs, seaCreatures,
    } = this.state;

    return (
      <div>
        <Paper>
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Bugs" />
            <Tab label="Fish" />
            <Tab label="Sea Creatures" />
          </Tabs>
          {tabIndex === 0 && (
            <CaughtCollectibles collectibles={bugs} />
          )}
          {tabIndex === 1 && (
            <CaughtCollectibles collectibles={fish} />
          )}
          {tabIndex === 2 && (
            <CaughtCollectibles collectibles={seaCreatures} />
          )}
          <AddButton tabIndex={tabIndex} />
        </Paper>
      </div>
    );
  }
}

Caught.contextType = GlobalContext;

export default Caught;
