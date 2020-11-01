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
                    props.collectibles.filter(c => c.availability.time === time).map((item, i) => {
                      return (
                        <Card key={i} className="card" variant="outlined">
                          <CardHeader className="card-header"
                            avatar={
                              <Avatar className="collectible-icon" alt={item.name['name-USen']} src={item.icon_uri} />
                            }
                            action={
                              <Checkbox
                                defaultChecked
                                color="secondary"
                              />
                            }
                            title={capitalizeString(item.name['name-USen'])}>
                          </CardHeader>
                          <CardContent>
                            <Typography color="textSecondary">
                              {item.availability['location']}
                            </Typography>
                            <Typography variant="body2" component="p">
                              {item.availability['rarity']}
                            </Typography>
                            <Typography variant="body2" component="p">
                              {item.speed}
                            </Typography>
                            {item.shadow && (
                              <Typography variant="body2" component="p">
                                {item.shadow} Shadow
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

