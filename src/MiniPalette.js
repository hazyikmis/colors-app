import React from "react";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/MiniPaletteStyles";

//The styles below moved to a separate file src/MiniPaletteStyles.js AND imported here as "styles"
/*
const styles = {
  root: {   },
  colors: {  },
  title: {  },
  emoji: {  },
  miniColor: {  },
};
*/

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors } = props;
  //console.log(classes);
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {/* MINI COLOR BOXES */}
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
