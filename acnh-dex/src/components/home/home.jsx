import './home.scss';
import React from 'react';
import {
  Drawer, List, Toolbar, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import Caught from '../caught/caught';
import ToCatch from '../to-catch/to-catch';

function Home() {
  const { id } = useParams();

  return (
    <div className="root">
      <Drawer
        className="drawer"
        variant="permanent"
        classes={{
          paper: 'drawer-paper',
        }}
      >
        <Toolbar />
        <div className="drawer-container">
          <List>
            <ListItem button key="To Catch" component={Link} to={`/${id}`}>
              <ListItemIcon>
                <PlaylistAddCheckIcon />
              </ListItemIcon>
              <ListItemText primary="To Catch" />
            </ListItem>
            <ListItem button key="Caught" component={Link} to={`/${id}/caught`}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Caught" />
            </ListItem>
          </List>
        </div>
      </Drawer>
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
