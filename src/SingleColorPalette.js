import React, { Component } from "react";
import { Link } from "react-router-dom";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { PaletteFooter } from "./PaletteFooter";
import { withStyles } from "@material-ui/core/styles";

const styles = {
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
    /* copied from colorBox style in ColorBox.js */ width: "20%",
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
  },
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   shades: this.gatherShades(this.props.palette, this.props.colorId)
    // }
    //since shades never changes, we do not need to store them in state!!!
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    //console.log(this._shades);
    this.state = { format: "hex" };
  }

  gatherShades(palette, colorToFilterBy) {
    //return all shades of given color
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      // shades.push(
      //   allColors[key].filter((color) => color.id === colorToFilterBy)
      // );
      //push creates array of arrays, we need array of objects
      //The push() adds elements to the end of an array and returns the new length of the array. Thus your return here is invalid.
      //The concat() method is used to merge arrays. Concat does not change the existing arrays, but instead returns a new array.
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
    //we do not need the first shade named "colorX 50", we need van 100 tot 900
  }

  changeColorFormat = (val) => {
    //alert(val);
    this.setState({ format: val });
  };

  render() {
    const { format } = this.state;
    const { classes } = this.props;
    const { paletteName, emoji, id } = this.props.palette;

    //shade is actually means color
    const colorBoxes = this._shades.map((shade) => (
      <ColorBox
        key={shade.name}
        name={shade.name}
        //background={shade.hex}
        background={shade[format]}
        //showMoreLink={false}
        showFullPalette={false}
      />
    ));
    return (
      //<div className="SingleColorPalette Palette">
      <div className={classes.Palette}>
        <Navbar
          handleChangeFormat={this.changeColorFormat}
          isSingleColorPalette={true}
        />
        {/* <h1>Single Color Palette</h1> */}
        {/* </div><div className="Palette-colors"> */}
        <div className={classes.PaletteColors}>
          {colorBoxes}
          {/* <div className="go-back ColorBox"> */}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
