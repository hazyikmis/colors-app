import React from "react";

import { withStyles } from "@material-ui/styles";

import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px" /* this is required after styling ".see-more" */,
    "&:hover svg": {
      //this styles applied only to the root(DraggableColorBox), when hovered the DraggableColorBox
      //but we want that these styles should be applied to the deleteIcon - but deleteIcon is a dynamic class name like deleteIcon-2939-232
      //if we check the deleteIcon in more detail from the F12/Elements, we see that its an "svg"
      //so, we can use this... to make a trick
      color: "white",
      transform: "scale(1.5)",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0, 0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};

const DraggableColorBox = (props) => {
  const { classes, color, name, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
};

export default withStyles(styles)(DraggableColorBox);
