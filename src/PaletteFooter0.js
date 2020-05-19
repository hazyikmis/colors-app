//THIS IS A GOOD EXAMPLE OF "FUNCTION COMPONENT" USING CONDITIONAL STYLING
//USING material-ui withStyles

import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  PaletteFooter: {
    backgroundColor: "white",
    height: "5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },
  emoji: {
    fontSize: "1.5rem",
    margin: "0 1rem",
  },
};

//export const PaletteFooter = (props) => {
const PaletteFooter = (props) => {
  const { paletteName, emoji, classes } = props;
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
