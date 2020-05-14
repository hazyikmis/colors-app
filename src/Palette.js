import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
  }

  changeLevel = (level) => {
    this.setState({ level });
  };

  render() {
    //const colorBoxes = this.props.colors.map((color) => (
    //  <ColorBox background={color.color} name={color.name} />
    // ));

    //<Palette {...seedColors[4]} /> this changed to <Palette palette={generatePalette(seedColors[4])} /> in App.js
    //Because of that, the code commented above changed like below:
    //(500 selected as starting point - just in the middle )

    //const colorBoxes = this.props.palette.colors[500].map((color) => (
    const { level } = this.state;
    const { colors } = this.props.palette;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={this.changeLevel}
        />
        {/* Navbar goes here */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer eventually */}
      </div>
    );
  }
}
