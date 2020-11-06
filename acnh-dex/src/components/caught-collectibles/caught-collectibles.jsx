import './caught-collectibles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {
  Avatar, IconButton, Card, CardHeader, Tooltip, Fab,
} from '@material-ui/core';
import capitalizeString from '../../utils/string-utils';

function AddButton({ type }) {
  return (
    <Tooltip title={`Add ${type}`} placement="bottom">
      <Fab className="add-button" color="secondary" aria-label={`add ${type}`}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}

AddButton.propTypes = {
  type: PropTypes.string.isRequired,
};

function CaughtCollectibles({ type, collectibles }) {
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
      <AddButton type={type} />
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
  type: PropTypes.string.isRequired,
};

export default CaughtCollectibles;
