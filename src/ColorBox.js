import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/core/styles";

//JSS: conditional styling
//with this method, we are checking luminance once, not conditionally in each text
const styles = {
  colorBox: {
    width: "20%",
    //height: "25%",  /* lets dynamically decide the height */
    height: (props) => (props.showFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px" /* this is required after styling ".see-more" */,
    "&:hover button": {
      opacity: "1",
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "black" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.1 ? "white" : "black",
  },
  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px" /* used for centrelizing vertically */,
    textTransform: "uppercase",
  },
  copyButton: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
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
    opacity: "0" /* Copy button completely hidden */,
  },
};

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
            className={`copy-overlay ${copied && "show"}`}
            style={{ background }}
          />
          {/* The another secret div below is the div contains the "Copied" message and color rgb info */}
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            {/* <p className={`${isLightColor && "dark-text"}`}>{background}</p> */}
            <p className={classes.copyText}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
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
