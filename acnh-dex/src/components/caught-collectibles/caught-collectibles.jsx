import './caught-collectibles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Avatar, IconButton, Card, CardHeader, Tooltip,
} from '@material-ui/core';
import capitalizeString from '../../utils/string-utils';

function CaughtCollectibles(props) {
  const { collectibles } = props;

  return (
    <div className="collectible-container">
      {collectibles.map((collectible) => (
        <Card key={collectible.id} className="card" variant="outlined">
          <CardHeader
            className="card-header"
            avatar={
              <Avatar className="collectible-icon" alt={collectible.name['name-USen']} src={collectible.icon_uri} />
            }
            action={(
              <Tooltip title="Delete">
                <IconButton edge="end" aria-label="delete collectible">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            title={capitalizeString(collectible.name['name-USen'])}
          />
        </Card>
      ))}
    </div>
  );
}

CaughtCollectibles.propTypes = {
  collectibles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.shape({
      'name-USen': PropTypes.string,
    }),
    icon_uri: PropTypes.string,
  })).isRequired,
};

export default CaughtCollectibles;
