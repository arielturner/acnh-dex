import './home.scss';
import React from 'react';
import {
  Drawer, List, Hidden, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography,
  IconButton, Divider,
} from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import Caught from '../caught/caught';
import ToCatch from '../to-catch/to-catch';

function Home() {
  const { id } = useParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="drawer-container">
      <List>
        <ListItem button key="To Catch" component={Link} to={`/${id}`} onClick={handleDrawerToggle}>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="To Catch" />
        </ListItem>
        <ListItem button key="Caught" component={Link} to={`/${id}/caught`} onClick={handleDrawerToggle}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Caught" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="root">
      <AppBar position="fixed" className="responsive-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // Setting to positive integer to maintain tab flow when in mobile view.
            tabIndex={1}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ACNH Dex
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className="drawer">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: 'drawer-paper',
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Toolbar />
            <Divider />
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: 'drawer-paper',
            }}
          >
            <Toolbar />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className="drawer-content">
        <Switch>
          <Route
            exact
            path="/:id/caught"
            render={() => (
              <Caught userName={id} />
            )}
          />
          <Route
            exact
            path="/:id"
            render={() => (
              <ToCatch userName={id} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default Home;
