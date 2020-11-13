import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../global/global-context';
import AvailableCollectibles from './available-collectibles/available-collectibles';
import CollectibleTabs from '../collectible-tabs/collectible-tabs';

const baseUrl = 'https://acnhapi.com/v1a';
const currentMonth = new Date().getMonth() + 1;

function sortFn(a, b) {
  return a.availability['time-array'][0] > b.availability['time-array'][0] ? 1 : -1;
}

class ToCatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fish: [], bugs: [], seaCreatures: [],
    };
  }

  componentDidMount() {
    this.loadAvailableCollectibles();
  }

  setAvailable(fish, bugs, seaCreatures, userCollectibles) {
    const caughtFishIds = userCollectibles.filter((c) => c.category === 'fish').map((c) => c.id);
    const caughtBugsIds = userCollectibles.filter((c) => c.category === 'bug').map((c) => c.id);
    const caughtSeaCreaturesIds = userCollectibles.filter((c) => c.category === 'sea creature').map((c) => c.id);

    const availableFish = fish.filter((f) => f.availability['month-array-northern'].includes(currentMonth) && !caughtFishIds.includes(f.id));
    const availableBugs = bugs.filter((b) => b.availability['month-array-northern'].includes(currentMonth) && !caughtBugsIds.includes(b.id));
    const availableSeaCreatures = seaCreatures.filter((sc) => sc.availability['month-array-northern'].includes(currentMonth) && !caughtSeaCreaturesIds.includes(sc.id));

    this.setState({
      fish: availableFish.map((f) => ({ ...f, name: f.name['name-USen'] })).sort(sortFn),
      bugs: availableBugs.map((b) => ({ ...b, name: b.name['name-USen'] })).sort(sortFn),
      seaCreatures: availableSeaCreatures.map((sc) => ({ ...sc, name: sc.name['name-USen'] })).sort(sortFn),
    });
  }

  handleCheck = (category, checked) => {
    const { setSnackbarMessage, toggleLoadingSpinner } = this.context;
    const { userName } = this.props;
    const component = this;

    toggleLoadingSpinner(true);

    const body = {
      name: userName,
      collectibles: [checked].map((c) => ({ ...c, category })),
    };

    axios.put('/api/users', body)
      .then(() => {
        component.loadAvailableCollectibles();
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
        toggleLoadingSpinner(false);
      });
  }

  loadAvailableCollectibles() {
    const { setSnackbarMessage, toggleLoadingSpinner } = this.context;
    const { userName } = this.props;
    const component = this;

    toggleLoadingSpinner(true);

    Promise.all([axios.get(`${baseUrl}/fish`), axios.get(`${baseUrl}/bugs`), axios.get(`${baseUrl}/sea`), axios.get(`/api/users/${userName}`)])
      .then((res) => {
        component.setAvailable(res[0].data, res[1].data, res[2].data, res[3].data[0].collectibles);
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
      })
      .finally(() => {
        toggleLoadingSpinner(false);
      });
  }

  render() {
    const {
      fish, bugs, seaCreatures,
    } = this.state;

    return (
      <div>
        <CollectibleTabs
          bugsComponent={
            <AvailableCollectibles category="bug" collectibles={bugs} onCheck={this.handleCheck} />
          }
          fishComponent={
            <AvailableCollectibles category="fish" collectibles={fish} onCheck={this.handleCheck} />
          }
          seaCreaturesComponent={
            <AvailableCollectibles category="sea creature" collectibles={seaCreatures} onCheck={this.handleCheck} />
          }
        />
      </div>
    );
  }
}

ToCatch.contextType = GlobalContext;
ToCatch.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default ToCatch;
