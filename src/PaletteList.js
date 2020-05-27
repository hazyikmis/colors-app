import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import MiniPalette from "./MiniPalette";

import styles from "./styles/PaletteListStyles";

import { CSSTransition, TransitionGroup } from "react-transition-group";

//dialog form imports -begin
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
//dialog form imports -end

//The styles below moved to a separate file src/PaletteListStyles.js AND imported here as "styles"
/*
const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    //border: "1px solid white",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
};
*/

// we have used Link like below, but this caused to underline all text & emojis
//so, we have used history.push, rather than Link
/* 
  <Link to={`/palette/${palette.id}`}>
    <MiniPalette {...palette} />
  </Link> 
*/

class PaletteList extends Component {
  state = { openDeleteDialog: false, deletingId: "" };

  openDialog = (id) => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  };

  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  };

  //goToPalette = (id) => {  //NO DIFFERENCE (At the beginning, but now its important)
  //goToPalette(id) {
  goToPalette = (id) => {
    //console.log("JJI");
    //since we have used history, "PaletteList" component should NOT be called with render in the App.js
    //or, if we still want to use render, then "routeProps" should be sent as argument to PaletteList component
    this.props.history.push(`palette/${id}`);
  };

  handleDelete = () => {
    this.props.removePalette(this.state.deletingId);
    this.closeDialog();
  };

  render() {
    const { openDeleteDialog } = this.state;
    const { classes, palettes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Palette List</h1>
            <Link to="/palette/new">Create New Palette</Link>
          </nav>

          {/* below, you can find how mini palettes rendered without using react-transition-group */}
          {/* <div className={classes.palettes}>
              {palettes.map((palette) => (
                <MiniPalette
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  handleDelete={removePalette}
                  key={palette.id}
                  id={palette.id}
                />
              ))}
          </div> */}

          {/* when TransitionGroup added just inside this div, it creates another div, so we cannot use classes.palettes. So, its better to remove that div */}
          {/* <div className={classes.palettes}> */}
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  //handleClick={() => this.goToPalette(palette.id)} //this prevents MiniPalette behave as a PureComponent
                  goToPalette={this.goToPalette} //this causes to change the definition of goToPalette from normal to arrow-function
                  //handleDelete={removePalette}
                  //handleDelete={this.openDialog}
                  openDeleteDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
          {/* </div> */}
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
