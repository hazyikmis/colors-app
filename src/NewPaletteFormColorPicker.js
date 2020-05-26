import React, { Component } from "react";

import { ChromePicker } from "react-color";

import Button from "@material-ui/core/Button";
//import DraggableColorBox from "./DraggableColorBox"; //moved to inside DraggableColorList.js

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/NewPaletteFormColorPickerStyles";

/*
//moved to styles/NewPaletteFormNavStyles.js

const styles = {
//...
};
*/

class NewPaletteFormColorPicker extends Component {
  state = {
    currentColor: "teal",
    newColorName: "",
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      //BE CAREFUL: We are not using the TextField's "value", we are using the ChromePickers color value which is in the state (currentColor)
      this.props.colors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currentColor.toLowerCase()
      )
    );
  }

  updateCurrentColor = (newColor) => {
    //console.log(newColor.hex);
    this.setState({ currentColor: newColor.hex });
  };

  handleChange = (evt) => {
    //this.setState({ newColorName: evt.target.value });
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  };

  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        {/* <ValidatorForm onSubmit={this.addNewColor}> */}
        <ValidatorForm onSubmit={this.handleSubmit} ref="form">
          <TextValidator
            value={newColorName}
            name="newColorName" //required for single "handleChange" event for all
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]} //order matters!
            errorMessages={[
              "enter a color name",
              "color name must be unique",
              "color already in the palette",
            ]}
            className={classes.colorNameInput}
            variant="filled"
            margin="normal"
            label="Color Name"
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: isPaletteFull ? "grey" : currentColor,
            }}
            //onClick={this.addNewColor}
            type="submit"
            disabled={isPaletteFull}
            className={classes.addColor}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
            {/* Add Color */}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(NewPaletteFormColorPicker);
