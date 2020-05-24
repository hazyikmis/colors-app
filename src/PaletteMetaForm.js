//this components opens a dialog form
//what is strange is, this component contains/shows the button which opens the dialog form and dialog itself
import React, { Component } from "react";

import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class PaletteMetaForm extends Component {
  state = { open: true, newPaletteName: "" };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  //the button opens this dialog moved to the NewPaletteFormNav.js
  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (evt) => {
    //this.setState({ newPaletteName: evt.target.value });
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const {
      /*handleChange,*/ handleSavePalette /*, newPaletteName */,
    } = this.props;
    //initially newPaletteName & handleChange comes from NewPaletteFormNav as props, but now newPaletteName is controlled as state in here
    const { newPaletteName } = this.state;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>

        <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it
              is unique.
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              name="newPaletteName" //required for single "handleChange" event for all
              value={newPaletteName}
              onChange={this.handleChange}
              validators={["required", "isPaletteNameUnique"]} //order matters!
              errorMessages={[
                "enter a palette name",
                "this name already taken",
              ]}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              //onClick={this.savePalette}
              type="submit"
              color="primary"
            >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}
