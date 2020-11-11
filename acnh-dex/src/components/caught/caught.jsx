import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../global/global-context';
import CaughtCollectibles from './caught-collectibles/caught-collectibles';
import CollectibleTabs from '../collectible-tabs/collectible-tabs';

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
    this.loadCaughtCollectibles();
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

  handleAddSelectedClick = (category, selected) => {
    const { setSnackbarMessage, toggleLoadingSpinner } = this.context;
    const { userName } = this.props;
    const component = this;

    toggleLoadingSpinner(true);

    const body = {
      name: userName,
      collectibles: selected.map((c) => ({ ...c, category })),
    };

    axios.put('/api/users', body)
      .then(() => {
        component.loadCaughtCollectibles();
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
        toggleLoadingSpinner(false);
      });
  }

  loadCaughtCollectibles() {
    const { setSnackbarMessage, toggleLoadingSpinner } = this.context;
    const { userName } = this.props;
    toggleLoadingSpinner(true);

    axios.get(`/api/users?name=${userName}`)
      .then((res) => {
        const { collectibles } = res.data[0];
        this.setState({
          fish: collectibles.filter((c) => c.category === 'fish').sort(sortFn),
          bugs: collectibles.filter((c) => c.category === 'bug').sort(sortFn),
          seaCreatures: collectibles.filter((c) => c.category === 'sea creature').sort(sortFn),
        });
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
          bugsComponent={(
            <CaughtCollectibles
              category="bug"
              collectibles={bugs}
              onDeleteClick={this.handleDeleteClick}
              onAddSelectedClick={this.handleAddSelectedClick}
            />
          )}
          fishComponent={(
            <CaughtCollectibles
              category="fish"
              collectibles={fish}
              onDeleteClick={this.handleDeleteClick}
              onAddSelectedClick={this.handleAddSelectedClick}
            />
          )}
          seaCreaturesComponent={(
            <CaughtCollectibles
              category="sea creature"
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
Caught.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Caught;
