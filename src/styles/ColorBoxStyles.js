import chroma from "chroma-js";

import sizes from "./sizes";

export default {
  colorBox: {
    width: "20%",
    //height: "25%",  /* lets dynamically decide the height */
    height: (props) => (props.showFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px" /* this is required after styling ".see-more" */,
    "&:hover button": {
      opacity: "1",
    },
    /*
    "@media (max-width: 900px)": {
      //this applies between 0px-500px
      width: "50%",
    },
    "@media (max-width: 500px)": {
      //this applies between 0px-500px
      width: "100%",
    },
//rather than writing down all pixel sizes in every style js file, the method below is far more better
//but first, you need to add ./styles/sizes.js and define sizes...
*/
    [sizes.down("lg")]: {
      width: "25%",
      height: (props) => (props.showFullPalette ? "20%" : "33.3333%"),
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props) => (props.showFullPalette ? "10%" : "20%"),
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props) => (props.showFullPalette ? "5%" : "10%"),
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "black" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.1 ? "white" : "black",
  },
  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px" /* used for centrelizing vertically */,
    textTransform: "uppercase",
  },
  copyButton: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px" /*to center button, since width=100px*/,
    marginTop: "-15px" /*to center button, since height=30px*/,
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px" /* used for centrelizing vertically */,
    textTransform: "uppercase",
    border: "none",
    textDecoration: "none",
    opacity: "0" /* Copy button completely hidden */,
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)" /* you might not notice the difference  */,
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "9",
    position: "absolute",
  },
  copyMsg: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
      [sizes.down("xs")]: {
        //without this, in xs case, "COPIED" message is h1 and too big
        fontSize: "5rem",
      },
    },
    "& p": {
      fontSize: "3rem",
      fontWeight: "100",
    },
  },
  showMsg: {
    opacity: 1,
    transform: "scale(1)",
    zIndex: 9,
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
};
