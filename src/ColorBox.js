import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
//import chroma from "chroma-js";

import { withStyles } from "@material-ui/core/styles";
import "./ColorBox.css";

import styles from "./styles/ColorBoxStyles";

//JSS: conditional styling
//with this method, we are checking luminance once, not conditionally in each text
//The styles below moved to a separate file src/ColorBoxStyles.js AND imported here as "styles"
/*
const styles = {
  colorBox: {..... },
  copyText: {......},
  colorName: {......},
  seeMore: {...... },
  copyButton: {.....},
  boxContent: {},
  copyOverlay: {},
  showOverlay: {},
  copyMsg: {},
  showMsg: {},
};
*/

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false }; //we need to know because copying process takes 1-2 secs
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const {
      name,
      background,
      /* id, paletteId,*/ moreURL,
      //showMoreLink,
      showFullPalette,
      classes /* to get higher order classes like styles --> withStyles */,
    } = this.props; //id is color.id
    const { copied } = this.state;
    //const isDarkColor = chroma(background).luminance() <= 0.1;
    //const isLightColor = chroma(background).luminance() >= 0.7;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.colorBox} style={{ background }}>
          {/* The secret div below is the div gets shown hugely and covers the screen when a ColorBox clicked */}
          <div
            //className={`copy-overlay ${copied && "show"}`}
            className={`${classes.copyOverlay} ${
              copied && classes.showOverlay
            }`}
            style={{ background }}
          />
          {/* The another secret div below is the div contains the "Copied" message and color rgb info */}
          <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
            <h1>Copied!</h1>
            {/* <p className={`${isLightColor && "dark-text"}`}>{background}</p> */}
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            {/* <div className="box-content"> */}
            <div className={classes.boxContent}>
              {/* <span className={isDarkColor && "light-text"}>{name}</span> */}
              <span className={classes.colorName}>{name}</span>
            </div>
            {/* <button className={`copy-button ${isLightColor && "dark-text"}`}> */}
            <button className={classes.copyButton}>Copy</button>
          </div>
          {/* onClick : stopPropagation used to prevent copy animation */}
          {/* /palette/:paletteId/:colorId : we need to pass through :paletteId & :colorId from Palette.js to here (ColorBox.js) */}
          {/* {showMoreLink && ( */}
          {showFullPalette && (
            <Link
              //to={`/palette/${paletteId}/${id}`}
              to={moreURL}
              onClick={(e) => e.stopPropagation()}
            >
              {/* <span className={`see-more ${isLightColor && "dark-text"}`}> */}
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
