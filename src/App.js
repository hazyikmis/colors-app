import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

//<Palette palette={seedColors[4]} />
//<Palette {...seedColors[4]} />

class App extends Component {
  //normally, there was no constructor defined in this class
  //until savedPalette & usage of local storage
  //this constructor used only for this purpose, state definition need not to move inside
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
  }

  //state = { palettes: seedColors };

  findPalette = (id) => {
    //seedColors is an array of "palette"s
    //return seedColors.find((palette) => palette.id === id);
    return this.state.palettes.find((palette) => palette.id === id);
  };

  savePalette = (newPalette) => {
    //console.log(newPalette);
    //this.setState({ palettes: [...this.state.palettes, newPalette] });
    /*
    this.setState({ palettes: [...this.state.palettes, newPalette] }, () => {
      this.syncLocalStorage();
    });
    */
    //here below is the simplified version
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  };

  removePalette = (id) => {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((palette) => palette.id !== id),
      }),
      this.syncLocalStorage
    );
  };

  syncLocalStorage = () => {
    //save palettes to local storage
    //since localStorage only accepts strings...
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
    //console.log(generatePalette(seedColors[4]));
    //<Route exact path="/" render={() => <h1>Palette List</h1>} />
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          //render={() => <NewPaletteForm savePalette={this.savePalette} />}
          render={(routeProps) => (
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={this.state.palettes} //this whole list required for validating new palette name, checking if the new name exists
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/"
          //render={() => <PaletteList palettes={seedColors} />}
          //since, we have started to use "history.push" in the PaletteList.js we need to pass routeProps
          render={(routeProps) => (
            //<PaletteList palettes={seedColors} {...routeProps} />
            <PaletteList
              palettes={this.state.palettes}
              removePalette={this.removePalette}
              {...routeProps}
            />
          )}
        />
        {/*
        <Route
          exact
          path="/palette/:id"
          render={() => <h1>Individual Palette</h1>}
        />
        */}
        {/* we need to take this "id", retrieve palette data from seedColors and generate palette and finally call Palette component  */}
        {/* IMPORTANT!!!: Below you can see the very clever way of using "routeProps", instantly accessing "id" in the route and using it when calling a method */}
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        {/* <Route path="/palette/:paletteId/:colorId" render={() => <h1>single color page</h1>} /> */}
        {/* <Route path="/palette/:paletteId/:colorId" render={() => <SingleColorPalette />} /> */}
        <Route
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                //this is too much data sending, no need to send all palette
                //but somehow we will extract required data (shades for only one color) in the SingleColorPalette.js
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>

      //<div>
      //  <Palette palette={generatePalette(seedColors[4])} />
      //</div>
    );
  }
}

export default App;
