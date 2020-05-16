import React, { Component } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
  }

  handleChange = (e) => {
    //-->Problematic:
    // this.setState({ format: e.target.value });
    // this.props.handleChangeFormat(this.state.format);

    //-->Works nice:
    // this.setState({ format: e.target.value }, () => {
    //   this.props.handleChangeFormat(this.state.format);
    // });

    //-->Works nice also:
    this.setState({ format: e.target.value });
    this.props.handleChangeFormat(e.target.value);
  };

  render() {
    //const { level, changeLevel, handleChangeFormat } = this.props;
    const { level, changeLevel } = this.props;
    const { format } = this.state;
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
        {/* <Select value={format} onChange={handleChangeFormat}> */}
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255,255,255, 0.5)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}
