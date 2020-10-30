import { IconButton, Snackbar } from '@material-ui/core';
import React from 'react';
import { SharedSnackbarConsumer } from './shared-snackbar-context';
import CloseIcon from '@material-ui/icons/Close';

const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarIsOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={[
          <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        ]}
      />
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;