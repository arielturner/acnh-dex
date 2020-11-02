import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, Avatar, CardHeader, Checkbox } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './available-collectibles.css';

export default function AvailableCollectibles(props) {
  const times = [...new Set(props.collectibles.map(c => c.availability.time))];

  const capitalizeString = (str) => {
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  return (
    <div>
      {
        times.map((time, i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{time === '' ? 'All day' : time}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="card-container">
                  {
                    props.collectibles.filter(c => c.availability.time === time).map((collectible, j) => {
                      return (
                        <Card key={j} className="card" variant="outlined">
                          <CardHeader className="card-header"
                            avatar={
                              <Avatar className="collectible-icon" alt={collectible.name['name-USen']} src={collectible.icon_uri} />
                            }
                            action={
                              <Checkbox
                                defaultChecked
                                color="secondary"
                              />
                            }
                            title={capitalizeString(collectible.name['name-USen'])}>
                          </CardHeader>
                          <CardContent>
                            <Typography color="textSecondary">
                              {collectible.availability['location']}
                            </Typography>
                            <Typography variant="body2" component="p">
                              {collectible.availability['rarity']}
                            </Typography>
                            <Typography variant="body2" component="p">
                              {collectible.speed}
                            </Typography>
                            {collectible.shadow && (
                              <Typography variant="body2" component="p">
                                {collectible.shadow} Shadow
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  }
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })
      }
    </div>
  );
}

