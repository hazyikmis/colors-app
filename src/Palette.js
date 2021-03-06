import React, { Component } from "react";
import ColorBox from "./ColorBox";

// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
import Navbar from "./Navbar";

//for specificity reasons "Palette.css" should be at the end!
//to overwrite some default styles decided by rc-slider/assets/index.css
//import { PaletteFooter } from "./PaletteFooter";
import PaletteFooter from "./PaletteFooter";

import { withStyles } from "@material-ui/core/styles";
//import "./Palette.css";

import styles from "./styles/PaletteStyles";

//The styles below moved to a separate file src/PaletteStyles.js AND imported here as "styles"
//the 2 class below already exist in the PaletteStyles - shared with SingleColorPalette
/*
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
};
*/

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
  }

  changeLevel = (level) => {
    this.setState({ level });
  };

  // changeColorFormat = (e) => {
  //   alert(e.target.value);
  // };

  changeColorFormat = (val) => {
    //alert(val);
    this.setState({ format: val });
  };

  render() {
    //const colorBoxes = this.props.colors.map((color) => (
    //  <ColorBox background={color.color} name={color.name} />
    // ));

    //<Palette {...seedColors[4]} /> this changed to <Palette palette={generatePalette(seedColors[4])} /> in App.js
    //Because of that, the code commented above changed like below:
    //(500 selected as starting point - just in the middle )

    //const colorBoxes = this.props.palette.colors[500].map((color) => (
    const { level, format } = this.state;
    const { classes } = this.props;
    const { colors, paletteName, emoji, id } = this.props.palette;
    const colorBoxes = colors[level].map((color) => (
      // <ColorBox background={color.hex} name={color.name} />
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        //id={color.id}
        //paletteId={id}
        moreURL={`/palette/${id}/${color.id}`}
        //showMoreLink={true}
        showFullPalette={true}
      />
    ));
    return (
      <div className={classes.Palette}>
        {/* <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
            trackStyle={{
              background: "transparent",
            }}
            railStyle={{
              height: "8px",
            }}
            handleStyle={{
              backgroundColor: "green",
              outline: "none",
              border: 0,
              boxShadow: "none",
              height: 15,
              width: 15,
              marginTop: -4,
            }}
          />
        </div> */}
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChangeFormat={this.changeColorFormat}
          isSingleColorPalette={false}
        />
        {/* Navbar goes here */}
        <div className={classes.PaletteColors}>{colorBoxes}</div>
        {/* footer eventually */}
        {/* <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer> */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
