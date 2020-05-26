import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import MiniPalette from "./MiniPalette";

import styles from "./styles/PaletteListStyles";

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
  //goToPalette = (id) => {  //NO DIFFERENCE
  goToPalette(id) {
    console.log("JJI");
    //since we have used history, "PaletteList" component should NOT be called with render in the App.js
    //or, if we still want to use render, then "routeProps" should be sent as argument to PaletteList component
    this.props.history.push(`palette/${id}`);
  }
  render() {
    const { classes, palettes, removePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Palette List</h1>
            <Link to="/palette/new">Create New Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={removePalette}
                key={palette.id}
                id={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
