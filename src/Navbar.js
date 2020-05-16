import React, { Component } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="/">react color picker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
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
          </div>
        </div>
        <div className="select-container">
          <Select>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255,255,255, 0.5)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}
