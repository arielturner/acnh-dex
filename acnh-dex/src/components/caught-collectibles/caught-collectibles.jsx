import './caught-collectibles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Avatar, IconButton, Card, CardHeader, Tooltip,
} from '@material-ui/core';
import capitalizeString from '../../utils/string-utils';
import AddCollectible from './add-collectible/add-collectible';

function CaughtCollectibles({ type, collectibles, onDeleteClick }) {
  return (
    <div className="collectible-container">
      {collectibles.map((collectible, i) => (
        <Card key={collectible.id} className="card" variant="outlined">
          <CardHeader
            className="card-header"
            avatar={
              <Avatar className="collectible-icon" alt={collectible.name['name-USen']} src={collectible.icon_uri} />
            }
            action={(
              <Tooltip title="Delete">
                <IconButton edge="end" aria-label="delete collectible" onClick={() => onDeleteClick(i)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            title={capitalizeString(collectible.name['name-USen'])}
          />
        </Card>
      ))}
      <AddCollectible type={type} caughtCollectibles={collectibles} />
    </div>
  );
}

CaughtCollectibles.propTypes = {
  type: PropTypes.string.isRequired,
  collectibles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.shape({
      'name-USen': PropTypes.string,
    }),
    icon_uri: PropTypes.string,
  })).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CaughtCollectibles;
