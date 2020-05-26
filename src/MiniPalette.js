import React from "react";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/MiniPaletteStyles";

import DeleteIcon from "@material-ui/icons/Delete";

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

//In order to add deletePalette event handler, we have changed this component from function to class
//function MiniPalette(props) {
class MiniPalette extends React.Component {
  //actually we are deleting the palette in the App.js, because all state and localStorage manipulated over there!
  deletePalette = (e) => {
    e.stopPropagation();
    //alert("HOPPAAA!");
    this.props.handleDelete(this.props.id);
  };

  render() {
    const { classes, paletteName, emoji, colors, handleClick } = this.props;
    //console.log(classes);
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));

    return (
      <div className={classes.root} onClick={handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          //inline style used for overcoming css specifity problem
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />
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
}

export default withStyles(styles)(MiniPalette);
