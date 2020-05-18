import React, { Component } from "react";
import { Link } from "react-router-dom";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", snackOpen: false };
  }

  handleChangeSelect = (e) => {
    //-->Problematic:
    // this.setState({ format: e.target.value });
    // this.props.handleChangeFormat(this.state.format);

    //-->Works nice:
    // this.setState({ format: e.target.value }, () => {
    //   this.props.handleChangeFormat(this.state.format);
    // });

    //-->Works nice also:
    this.setState({ format: e.target.value, snackOpen: true });
    this.props.handleChangeFormat(e.target.value);
  };

  closeSnackbar = () => {
    this.setState({ snackOpen: false });
  };

  render() {
    //const { level, changeLevel, handleChangeFormat } = this.props;
    const { level, changeLevel, isSingleColorPalette } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">react color picker</Link>
        </div>
        {!isSingleColorPalette && (
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
        )}
        {/* <Select value={format} onChange={handleChangeFormat}> */}
        <div className="select-container">
          <Select value={format} onChange={this.handleChangeSelect}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255,255,255, 0.5)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.snackOpen}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format changed to {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.closeSnackbar} //causes to close Snackbar whenever user clicks somewhere
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}
