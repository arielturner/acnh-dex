import React from 'react';
import axios from 'axios';
import { GlobalContext } from '../../providers/global-context';
import CaughtCollectibles from '../caught-collectibles/caught-collectibles';
import CollectibleTabs from '../collectible-tabs/collectible-tabs';

const baseUrl = 'http://acnhapi.com/v1a';

class Caught extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fish: [], bugs: [], seaCreatures: [],
    };
  }

  componentDidMount() {
    const { setSnackbarMessage, toggleLoadingSpinner } = this.context;
    toggleLoadingSpinner(true);

    Promise.all([axios.get(`${baseUrl}/fish`), axios.get(`${baseUrl}/bugs`), axios.get(`${baseUrl}/sea`)])
      .then((values) => {
        this.setState({
          fish: values[0].data,
          bugs: values[1].data,
          seaCreatures: values[2].data,
        });
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
      })
      .finally(() => {
        toggleLoadingSpinner(false);
      });
  }

  handleBugDeleteClick = (index) => {
    const { bugs } = this.state;
    const newBugs = [...bugs];
    newBugs.splice(index, 1);
    this.setState({ bugs: newBugs });
  }

  handleFishDeleteClick = (index) => {
    const { fish } = this.state;
    const newFish = [...fish];
    newFish.splice(index, 1);
    this.setState({ fish: newFish });
  }

  handleSeaCreatureDeleteClick = (index) => {
    const { seaCreatures } = this.state;
    const newSeaCreatures = [...seaCreatures];
    newSeaCreatures.splice(index, 1);
    this.setState({ seaCreatures: newSeaCreatures });
  }

  render() {
    const {
      fish, bugs, seaCreatures,
    } = this.state;

    return (
      <div>
        <CollectibleTabs
          bugsComponent={<CaughtCollectibles type="bug" collectibles={bugs} onDeleteClick={this.handleBugDeleteClick} />}
          fishComponent={<CaughtCollectibles type="fish" collectibles={fish} onDeleteClick={this.handleFishDeleteClick} />}
          seaCreaturesComponent={<CaughtCollectibles type="sea creature" collectibles={seaCreatures} onDeleteClick={this.handleSeaCreatureDeleteClick} />}
        />
      </div>
    );
  }
}

Caught.contextType = GlobalContext;

export default Caught;
