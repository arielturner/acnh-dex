import React from 'react';
import axios from 'axios';
import { GlobalContext } from "../../providers/global-context";
import { CircularProgress, Paper, Tabs, Tab } from '@material-ui/core';
import AvailableCollectibles from '../available-collectibles/available-collectibles';
import './to-catch.css';

const baseUrl = 'http://acnhapi.com/v1a';
const currentMonth = new Date().getMonth() + 1;

export default class ToCatch extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      value: 0,
      fish: [],
      bugs: [],
      seaCreatures: [],
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount() {
    let component = this;
    const { setSnackbarMessage } = this.context;

    Promise.all([axios.get(`${baseUrl}/fish`), axios.get(`${baseUrl}/bugs`), axios.get(`${baseUrl}/sea`)])
      .then(function (values) {
        component.setAvailable(values[0].data, values[1].data, values[2].data);
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  setAvailable(fish, bugs, seaCreatures) {
    var availableFish = fish.filter(f => f.availability['month-array-northern'].includes(currentMonth));
    var availableBugs = bugs.filter(b => b.availability['month-array-northern'].includes(currentMonth));
    var availableSeaCreatures = seaCreatures.filter(sc => sc.availability['month-array-northern'].includes(currentMonth));

    this.setState({
      fish: availableFish.sort(this.sortFn),
      bugs: availableBugs.sort(this.sortFn),
      seaCreatures: availableSeaCreatures.sort(this.sortFn)
    });
  }

  sortFn(a, b) {
    return a.availability['time-array'][0] > b.availability['time-array'][0] ? 1 : -1;
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <div className="spinner-container">
            <CircularProgress color="secondary" />
          </div>
          :
          <Paper>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Bugs" />
              <Tab label="Fish" />
              <Tab label="Sea Creatures" />
            </Tabs>
            {this.state.value === 0 && (
              <AvailableCollectibles collectibles={this.state.bugs} />
            )}
            {this.state.value === 1 && (
              <AvailableCollectibles collectibles={this.state.fish} />
            )}
            {this.state.value === 2 && (
              <AvailableCollectibles collectibles={this.state.seaCreatures} />
            )}
          </Paper>
        }
      </div>
    );
  }
}
