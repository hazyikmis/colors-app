import sizes from "./sizes";

//import bg1 from "./bg1.svg";
import bg2 from "./bg2.svg";

export default {
  root: {
    //backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    /* background by SVGBackgrounds.com */
    /*
    backgroundColor: "#ee3221",
    backgroundImage: `url(${bg1})`,
    backgroundSize: "cover",
    */
    backgroundColor: "#1215b3",
    backgroundImage: `url(${bg2})`,
    backgroundAttachment: "fixed",
    overflow: "scroll",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    //border: "1px solid white",
    [sizes.down("xl")]: {
      width: "70%",
    },
    [sizes.down("xs")]: {
      width: "60%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
      textDecoration: "none", //to remove underline
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    //gridGap: "5%",  //% values might be a problem in different browsers!
    gridGap: "2.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1rem",
    },
  },
  heading: {
    fontSize: "2rem",
  },
};
