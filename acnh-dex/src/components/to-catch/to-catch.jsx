import React from 'react';
import axios from 'axios';
import { GlobalContext } from '../../providers/global-context';
import AvailableCollectibles from '../available-collectibles/available-collectibles';
import CollectibleTabs from '../collectible-tabs/collectible-tabs';

const baseUrl = 'http://acnhapi.com/v1a';
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

  setAvailable(fish, bugs, seaCreatures) {
    const availableFish = fish.filter((f) => f.availability['month-array-northern'].includes(currentMonth));
    const availableBugs = bugs.filter((b) => b.availability['month-array-northern'].includes(currentMonth));
    const availableSeaCreatures = seaCreatures.filter((sc) => sc.availability['month-array-northern'].includes(currentMonth));

    this.setState({
      fish: availableFish.sort(sortFn),
      bugs: availableBugs.sort(sortFn),
      seaCreatures: availableSeaCreatures.sort(sortFn),
    });
  }

  render() {
    const {
      fish, bugs, seaCreatures,
    } = this.state;

    return (
      <div>
        <CollectibleTabs
          bugsComponent={<AvailableCollectibles collectibles={bugs} />}
          fishComponent={<AvailableCollectibles collectibles={fish} />}
          seaCreaturesComponent={<AvailableCollectibles collectibles={seaCreatures} />}
        />
      </div>
    );
  }
}

ToCatch.contextType = GlobalContext;

export default ToCatch;
