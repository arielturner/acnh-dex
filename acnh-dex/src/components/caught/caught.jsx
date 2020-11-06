import React from 'react';
import axios from 'axios';
import './caught.scss';
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

  render() {
    const {
      fish, bugs, seaCreatures,
    } = this.state;

    return (
      <div>
        <CollectibleTabs
          bugsComponent={<CaughtCollectibles type="bug" collectibles={bugs} />}
          fishComponent={<CaughtCollectibles type="fish" collectibles={fish} />}
          seaCreaturesComponent={<CaughtCollectibles type="sea creature" collectibles={seaCreatures} />}
        />
      </div>
    );
  }
}

Caught.contextType = GlobalContext;

export default Caught;
