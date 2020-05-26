import sizes from "./sizes";

export default {
  Palette: {
    height: "98vh",
    width: "99vw",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
  },
  PaletteColors: {
    height: "90%",
  },
  PaletteFooter: {
    backgroundColor: "white",
    height: "5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },
  goBack: {
    /* copied from colorBox style in ColorBox.js */
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px" /* this is required after styling ".see-more" */,
    opacity: "1",
    backgroundColor: "black",
    //position: "relative",  //already available
    "& a": {
      color: "white",
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
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },
};
