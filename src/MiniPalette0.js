import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal",
    /* nesting */
    "& h1": {
      color: "white",
      /* further nesting, span inside of h1 which is inside main class! */
      "& span": {
        background: "yellow",
      },
    },
  },
  secondary: {
    backgroundColor: "pink",
  },
};

function MiniPalette(props) {
  const { classes } = props;
  console.log(classes);
  return (
    <div className={classes.main}>
      <h1>
        Mini Palette <span>by react</span>
      </h1>
      <section className={classes.secondary}>asjhdkahsdja</section>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
