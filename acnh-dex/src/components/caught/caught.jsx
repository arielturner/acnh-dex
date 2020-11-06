import React from 'react';
import axios from 'axios';
import { GlobalContext } from '../../global/global-context';
import CaughtCollectibles from './caught-collectibles/caught-collectibles';
import CollectibleTabs from '../collectible-tabs/collectible-tabs';

const baseUrl = 'http://acnhapi.com/v1a';

function sortFn(a, b) {
  return a.id > b.id ? 1 : -1;
}

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

  handleDeleteClick = (type, index) => {
    const { bugs, fish, seaCreatures } = this.state;
    const newBugs = [...bugs];
    const newFish = [...fish];
    const newSeaCreatures = [...seaCreatures];

    if (type === 'bug') {
      newBugs.splice(index, 1);
    } else if (type === 'fish') {
      newFish.splice(index, 1);
    } else {
      newSeaCreatures.splice(index, 1);
    }

    this.setState({ bugs: newBugs, fish: newFish, seaCreatures: newSeaCreatures });
  }

  handleAddSelectedClick = (type, selected) => {
    const { bugs, fish, seaCreatures } = this.state;

    if (type === 'bug') {
      this.setState({ bugs: [...bugs, ...selected].sort(sortFn) });
    } else if (type === 'fish') {
      this.setState({ fish: [...fish, ...selected].sort(sortFn) });
    } else {
      this.setState({ seaCreatures: [...seaCreatures, ...selected].sort(sortFn) });
    }
  }

  render() {
    const {
      fish, bugs, seaCreatures,
    } = this.state;

    return (
      <div>
        <CollectibleTabs
          bugsComponent={(
            <CaughtCollectibles
              type="bug"
              collectibles={bugs}
              onDeleteClick={this.handleDeleteClick}
              onAddSelectedClick={this.handleAddSelectedClick}
            />
          )}
          fishComponent={(
            <CaughtCollectibles
              type="fish"
              collectibles={fish}
              onDeleteClick={this.handleDeleteClick}
              onAddSelectedClick={this.handleAddSelectedClick}
            />
          )}
          seaCreaturesComponent={(
            <CaughtCollectibles
              type="sea creature"
              collectibles={seaCreatures}
              onDeleteClick={this.handleDeleteClick}
              onAddSelectedClick={this.handleAddSelectedClick}
            />
          )}
        />
      </div>
    );
  }
}

Caught.contextType = GlobalContext;

export default Caught;
