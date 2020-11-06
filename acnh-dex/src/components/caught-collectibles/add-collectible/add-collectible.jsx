import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip,
  Fab, ListItemAvatar, ListItemSecondaryAction, Checkbox, Avatar,
} from '@material-ui/core';
import './add-collectible.scss';
import axios from 'axios';
import { GlobalContext } from '../../../providers/global-context';
import capitalizeString from '../../../utils/string-utils';

const baseUrl = 'http://acnhapi.com/v1a';

export default function AddCollectible({ type, caughtCollectibles }) {
  const { setSnackbarMessage, toggleLoadingSpinner } = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [availableCollectibles, setAvailableCollectibles] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const handleClickOpen = () => {
    toggleLoadingSpinner(true);

    let url;
    if (type === 'bug') {
      url = `${baseUrl}/bugs`;
    } else if (type === 'fish') {
      url = `${baseUrl}/fish`;
    } else {
      url = `${baseUrl}/sea`;
    }

    axios.get(url)
      .then((values) => {
        const caughtIds = caughtCollectibles.map((c) => c.id);
        setAvailableCollectibles(values.data.filter(((c) => !caughtIds.includes(c.id))));
        setChecked([]);
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
      })
      .finally(() => {
        toggleLoadingSpinner(false);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Tooltip title={`Add ${type}`} placement="bottom">
        <Fab className="add-button" color="secondary" aria-label={`add ${type}`} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title">{`Add ${type}`}</DialogTitle>
        <DialogContent dividers>
          <List dense>
            {availableCollectibles.map((collectible, i) => (
              <ListItem key={collectible.id} button onClick={handleToggle(i)}>
                <ListItemAvatar>
                  <Avatar className="collectible-icon" alt={collectible.name['name-USen']} src={collectible.icon_uri} />
                </ListItemAvatar>
                <ListItemText primary={capitalizeString(collectible.name['name-USen'])} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(i)}
                    checked={checked.includes(i)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {availableCollectibles.length === 0 && (
            <div>You already caught &apos;em all!</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          {availableCollectibles.length !== 0 && (
            <Button autoFocus onClick={handleClose} color="primary">
              Add Selected
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddCollectible.propTypes = {
  type: PropTypes.string.isRequired,
  caughtCollectibles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.shape({
      'name-USen': PropTypes.string,
    }),
    icon_uri: PropTypes.string,
  })).isRequired,
};
