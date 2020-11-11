import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip,
  Fab, ListItemAvatar, ListItemSecondaryAction, Checkbox, Avatar, Typography,
} from '@material-ui/core';
import './add-collectible.scss';
import axios from 'axios';
import { GlobalContext } from '../../../../global/global-context';
import capitalizeString from '../../../../utils/string-utils';

const baseUrl = 'http://acnhapi.com/v1a';

export default function AddCollectible({ category, caughtCollectibles, onAddSelectedClick }) {
  const { setSnackbarMessage, toggleLoadingSpinner } = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [availableCollectibles, setAvailableCollectibles] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const handleClickOpen = () => {
    toggleLoadingSpinner(true);

    let url;
    if (category === 'bug') {
      url = `${baseUrl}/bugs`;
    } else if (category === 'fish') {
      url = `${baseUrl}/fish`;
    } else {
      url = `${baseUrl}/sea`;
    }

    axios.get(url)
      .then((res) => {
        const caughtIds = caughtCollectibles.map((c) => c.id);
        const available = res.data.filter(((c) => !caughtIds.includes(c.id))).map((c) => ({ ...c, name: c.name['name-USen'] }));
        setAvailableCollectibles(available);
        setChecked([]);
      })
      .catch((err) => {
        setSnackbarMessage(err.toString());
      })
      .finally(() => {
        setOpen(true);
        toggleLoadingSpinner(false);
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

  const handleAddSelectedClick = () => {
    onAddSelectedClick(category, availableCollectibles.filter((c) => checked.includes(c.id)));
    handleClose();
  };

  return (
    <div>
      <Tooltip title={`Add ${category}`} placement="bottom">
        <Fab className="add-button" color="secondary" aria-label={`add ${category}`} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title">{`Add ${category}`}</DialogTitle>
        <DialogContent dividers>
          <List dense>
            {availableCollectibles.map((collectible) => (
              <ListItem key={collectible.id} button onClick={handleToggle(collectible.id)}>
                <ListItemAvatar>
                  <Avatar className="collectible-icon" alt={collectible.name} src={collectible.icon_uri} />
                </ListItemAvatar>
                <ListItemText primary={capitalizeString(collectible.name)} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(collectible.id)}
                    checked={checked.includes(collectible.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {availableCollectibles.length === 0 && (
            <Typography variant="body1" gutterBottom>You already caught &apos;em all!</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          {availableCollectibles.length !== 0 && (
            <Button autoFocus color="primary" onClick={handleAddSelectedClick}>
              Add Selected
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddCollectible.propTypes = {
  category: PropTypes.string.isRequired,
  caughtCollectibles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    // name: PropTypes.shape({
    //   'name-USen': PropTypes.string,
    // }),
    name: PropTypes.string,
    icon_uri: PropTypes.string,
  })).isRequired,
  onAddSelectedClick: PropTypes.func.isRequired,
};
