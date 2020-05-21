import React from "react";

import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px" /* this is required after styling ".see-more" */,
  },
};

const DraggableColorBox = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: props.color }}>
      <h4>{props.color}</h4>
    </div>
  );
};

export default withStyles(styles)(DraggableColorBox);
