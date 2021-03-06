import chroma from "chroma-js";

import sizes from "./sizes";

//const styles = {
export default {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-6px", //this is required after styling ".see-more",
    "&:hover svg": {
      //this styles applied only to the root(DraggableColorBox), when hovered the DraggableColorBox
      //but we want that these styles should be applied to the deleteIcon - but deleteIcon is a dynamic class name like deleteIcon-2939-232
      //if we check the deleteIcon in more detail from the F12/Elements, we see that its an "svg"
      //so, we can use this... to make a trick
      color: "white",
      transform: "scale(1.5)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    //color: "rgba(0,0,0, 0.5)",  //this always adds the new ColorBox with black color
    //we have checked the props of DraggableColorBox.js and see that "color" is the background color
    color: (props) =>
      chroma(props.color).luminance() <= 0.1
        ? "rgba(255,255,255, 0.5)"
        : "rgba(0,0,0, 0.5)",
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
