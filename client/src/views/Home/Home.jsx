import React, { Component } from "react";
import { HashRouter, Route, Switch, NavLink } from "react-router-dom";
// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//css
import './Home.css'
// pages
import Dashboard from "../Dashboard/Dahsboard";
import Search from "../Search/Search";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      drawerOpen: false
    }
  }

  componentWillMount() {
  }

  render() {
    const { drawerOpen } = this.state;
    const { store } = this.props;
    const reduxState = store.getState();

    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu" onClick={() => this.setState({ drawerOpen: !drawerOpen })}>
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h6" >
              Twitter App
            </Typography>
          </Toolbar>
        </AppBar>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={(props) => React.createElement(Dashboard, { ...props, store: store, state: reduxState })} />
            <Route path="/search" render={(props) => React.createElement(Search, { ...props, store: store, state: reduxState })} />
          </Switch>
          <Drawer open={drawerOpen} onClose={() => this.setState({ drawerOpen: !drawerOpen })}>
            <List component="nav">
              <NavLink className="link" to="/">
                <ListItem button>
                  <ListItemIcon>
                    <Icon>home</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </NavLink>
              <NavLink className="link" to="/search">
                <ListItem button>
                  <ListItemIcon>
                    <Icon>search</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItem>
              </NavLink>
            </List>
          </Drawer>

        </HashRouter>
      </div>
    )
  };
}