import React, { PureComponent } from "react";
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
class MiniPalette extends PureComponent {
  //actually we are deleting the palette in the App.js, because all state and localStorage manipulated over there!
  deletePalette = (e) => {
    e.stopPropagation();
    //alert("HOPPAAA!");
    //this.props.handleDelete(this.props.id);
    this.props.openDeleteDialog(this.props.id);
  };

  handleClick = () => {
    this.props.goToPalette(this.props.id);
  };

  render() {
    //const { classes, paletteName, emoji, colors, handleClick } = this.props;
    //const { classes, paletteName, emoji, colors, goToPalette, id } = this.props;
    const { classes, paletteName, emoji, colors } = this.props;

    //console.log(classes);
    console.log("RENDERING Mini Palette:", paletteName);
    //This component changed to PureComponent, but it still re-renders
    //Because one of the props (handleClick) is changed every time
    //Since this prop sent as handleClick={() => this.goToPalette(palette.id)}
    //Please check from PaletteList.js
    //If we change it

    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));

    return (
      //</div><div className={classes.root} onClick={handleClick}>
      //we have changed parent component's how to send handleClick props
      //and here we calling inline function AND THIS IS NOT AFFECTING this component's being PureComponent
      //PS: handleClick changed to goToPalette
      //<div className={classes.root} onClick={() => goToPalette(id)}>
      //Maybe its better to create a method and call it onClick
      <div className={classes.root} onClick={this.handleClick}>
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
