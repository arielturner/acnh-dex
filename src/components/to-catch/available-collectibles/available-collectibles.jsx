import './available-collectibles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, Avatar, CardHeader,
  Checkbox, Tooltip,
} from '@material-ui/core';
import capitalizeString from '../../../utils/string-utils';

function AvailableCollectibles({ category, collectibles, onCheck }) {
  const times = [...new Set(collectibles.map((c) => c.availability.time))];

  return (
    <div className="available-container">
      {
        times.map((time) => (
          <Accordion key={time}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{time === '' ? 'All day' : time}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="card-container">
                {
                  collectibles.filter((c) => c.availability.time === time).map((collectible) => (
                    <Card key={collectible.id} className="card" variant="outlined">
                      <CardHeader
                        className="card-header"
                        avatar={
                          <Avatar className="collectible-icon" alt={collectible.name} src={collectible.icon_uri} />
                        }
                        action={(
                          <Tooltip title="Mark as caught">
                            <Checkbox color="secondary" onChange={() => onCheck(category, collectible)} />
                          </Tooltip>
                        )}
                        title={capitalizeString(collectible.name)}
                      />
                      <CardContent>
                        <Typography color="textSecondary">
                          {collectible.availability.location}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {collectible.availability.rarity}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {collectible.speed}
                        </Typography>
                        {collectible.shadow && (
                          <Typography variant="body2" component="p">
                            {collectible.shadow}
                            {' '}
                            shadow
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }
      {collectibles.length === 0 && (
        <Typography variant="body1">
          You&apos;ve already caught all the
          {' '}
          {category !== 'fish' ? `${category}s ` : `${category} `}
          available for this month.
        </Typography>
      )}
    </div>
  );
}

AvailableCollectibles.propTypes = {
  category: PropTypes.string.isRequired,
  collectibles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    availability: PropTypes.shape({
      location: PropTypes.string,
      rarity: PropTypes.string,
    }),
    speed: PropTypes.string,
    shadow: PropTypes.string,
    icon_uri: PropTypes.string,
  })).isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default AvailableCollectibles;
