import React, { Component } from "react";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { PaletteFooter } from "./PaletteFooter";

export default class SingleColorPalette extends Component {
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
    const { paletteName, emoji } = this.props.palette;
    //shade is actually means color
    const colorBoxes = this._shades.map((shade) => (
      <ColorBox
        key={shade.id}
        name={shade.name}
        //background={shade.hex}
        background={shade[format]}
        showMoreLink={false}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          handleChangeFormat={this.changeColorFormat}
          isSingleColorPalette={true}
        />
        {/* <h1>Single Color Palette</h1> */}
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
