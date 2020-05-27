import sizes from "./sizes";

export default {
  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    [sizes.down("sm")]: {
      width: "200px",
    },
  },
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
    [sizes.down("xs")]: {
      display: "none",
    },
  },
  selectContainer: {
    marginLeft: "auto" /* this aligns right */,
    marginRight: "1rem",
  },
};
