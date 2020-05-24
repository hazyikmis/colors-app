//this components opens a dialog form
//and we are using a separate dialog for emoji picker (this same file)
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

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default class PaletteMetaForm extends Component {
  //state = { open: true, newPaletteName: "" };
  state = { stage: "form", newPaletteName: "" };
  //2 stages: 1-form 2-emoji

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

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  handleChange = (evt) => {
    //this.setState({ newPaletteName: evt.target.value });
    this.setState({ [evt.target.name]: evt.target.value });
  };

  showEmojiPicker = () => {
    this.setState({ stage: "emoji" });
  };

  emojiSelectHandler = (emoji) => {
    //console.log(emoji);
    const newPaletteMetaInfo = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSavePalette(newPaletteMetaInfo);
    //newPaletteMetaInfo --> NewPaletteForm.savePalette(newPaletteNameAndEmoji)
  };

  render() {
    const {
      /*handleChange, handleSavePalette, newPaletteName,*/
      hideForm,
    } = this.props;
    //initially newPaletteName & handleChange comes from NewPaletteFormNav as props, but now newPaletteName is controlled as state in here
    const { newPaletteName, stage } = this.state;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle id="emoji-form-dialog-title">
            Pick a Palette Emoji
          </DialogTitle>

          <Picker
            onSelect={this.emojiSelectHandler}
            title="Pick a Palette Emoji"
          />
        </Dialog>

        <Dialog
          open={stage === "form"}
          //onClose={this.handleClose}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a palette name
          </DialogTitle>

          {/* <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}> */}

          <ValidatorForm onSubmit={this.showEmojiPicker}>
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
              {/* </DialogActions><Button onClick={this.handleClose} color="primary"> */}
              <Button onClick={hideForm} color="primary">
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
      </div>
    );
  }
}
