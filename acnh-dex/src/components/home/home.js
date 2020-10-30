import React from 'react';
import ToCatch from '../to-catch/to-catch';
import Caught from '../caught/caught';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Switch, Route, Link, useParams } from "react-router-dom";
import './home.css';

export default function Home() {
  let { id } = useParams();

  return (
    <div className="root">
      <Drawer
        className="drawer"
        variant="permanent"
        classes={{
          paper: "drawer-paper",
        }}
      >
        <Toolbar />
        <div className="drawer-container">
          <List>
            <ListItem button key={'To Catch'} component={Link} to={`/${id}`}>
              <ListItemIcon>
                <PlaylistAddCheckIcon />
              </ListItemIcon>
              <ListItemText primary={'To Catch'} />
            </ListItem>
            <ListItem button key={'Caught'} component={Link} to={`/${id}/caught`}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary={'Caught'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className="drawer-content">
        <Switch>
          <Route exact path='/:id/caught' component={Caught}></Route>
          <Route exact path='/:id' component={ToCatch}></Route>
        </Switch>
      </main>
    </div>
  );
}

