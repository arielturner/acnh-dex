import './caught-collectibles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Avatar, IconButton, Card, CardHeader, Tooltip, Typography,
} from '@material-ui/core';
import capitalizeString from '../../../utils/string-utils';
import AddCollectible from './add-collectible/add-collectible';

function CaughtCollectibles({
  category, collectibles, onDeleteClick, onAddSelectedClick,
}) {
  return (
    <div className="caught-container">
      <div className="collectible-container">
        {collectibles.map((collectible, i) => (
          <Card key={collectible.id} className="card" variant="outlined">
            <CardHeader
              className="card-header"
              avatar={
                <Avatar className="collectible-icon" alt={collectible.name} src={collectible.icon_uri} />
              }
              action={(
                <Tooltip title="Delete">
                  <IconButton edge="end" aria-label="delete collectible" onClick={() => onDeleteClick(category, i)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              title={capitalizeString(collectible.name)}
            />
          </Card>
        ))}
        {collectibles.length === 0 && (
          <Typography variant="body1">
            You haven&apos;t caught any
            {' '}
            {category}
            s.
          </Typography>
        )}
      </div>

      <AddCollectible
        category={category}
        caughtCollectibles={collectibles}
        onAddSelectedClick={onAddSelectedClick}
      />
    </div>
  );
}

CaughtCollectibles.propTypes = {
  category: PropTypes.string.isRequired,
  collectibles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    // name: PropTypes.shape({
    //   'name-USen': PropTypes.string,
    // }),
    name: PropTypes.string,
    icon_uri: PropTypes.string,
  })).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddSelectedClick: PropTypes.func.isRequired,
};

export default CaughtCollectibles;
