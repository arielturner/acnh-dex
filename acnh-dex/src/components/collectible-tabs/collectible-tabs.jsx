import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';

function CollectibleTabs({ bugsComponent, fishComponent, seaCreaturesComponent }) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Bugs" />
          <Tab label="Fish" />
          <Tab label="Sea Creatures" />
        </Tabs>
        {tabIndex === 0 && (
          bugsComponent
        )}
        {tabIndex === 1 && (
          fishComponent
        )}
        {tabIndex === 2 && (
          seaCreaturesComponent
        )}
      </Paper>
    </div>
  );
}

CollectibleTabs.propTypes = {
  bugsComponent: PropTypes.element.isRequired,
  fishComponent: PropTypes.element.isRequired,
  seaCreaturesComponent: PropTypes.element.isRequired,
};

export default CollectibleTabs;
