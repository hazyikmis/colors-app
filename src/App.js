import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

//<Palette palette={seedColors[4]} />
//<Palette {...seedColors[4]} />

class App extends Component {
  findPalette(id) {
    //seedColors is an array of "palette"s
    return seedColors.find((palette) => palette.id === id);
  }

  render() {
    //console.log(generatePalette(seedColors[4]));
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List</h1>} />
        {/*
        <Route
          exact
          path="/palette/:id"
          render={() => <h1>Individual Palette</h1>}
        />
        */}
        {/* we need to take this "id", retrieve palette data from seedColors and generate palette and finally call Palette component  */}
        {/* IMNPORTANT!!!: Below you can see the very clever way of using "routeProps", instantly accessing "id" in the route and using it when calling a method */}
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
      </Switch>

      //<div>
      //  <Palette palette={generatePalette(seedColors[4])} />
      //</div>
    );
  }
}

export default App;
