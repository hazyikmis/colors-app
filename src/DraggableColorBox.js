import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

import styles from "./styles/DraggableColorBoxStyles";

/*
//moved to styles/DraggableColorBoxStyles.js

const styles = {
//...
};
*/

//const DraggableColorBox = (props) => {
//covered all method inside "SortableElement"
const DraggableColorBox = SortableElement((props) => {
  const { classes, color, name, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
