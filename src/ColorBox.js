import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class ColorBox extends Component {
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
      showMoreLink,
    } = this.props; //id is color.id
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background }}>
          {/* The secret div below is the div gets shown hugely and covers the screen when a ColorBox clicked */}
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background }}
          />
          {/* The another secret div below is the div contains the "Copied" message and color rgb info */}
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          {/* onClick : stopPropagation used to prevent copy animation */}
          {/* /palette/:paletteId/:colorId : we need to pass through :paletteId & :colorId from Palette.js to here (ColorBox.js) */}
          {showMoreLink && (
            <Link
              //to={`/palette/${paletteId}/${id}`}
              to={moreURL}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="see-more">More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
