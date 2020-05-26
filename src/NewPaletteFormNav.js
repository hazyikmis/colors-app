import React, { Component } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
//import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
//import { withStyles, withTheme } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
//import DraggableColorBox from "./DraggableColorBox"; //moved to inside DraggableColorList.js

//moved to PaletteMetaForm.js
//import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { withStyles } from "@material-ui/core/styles";

import PaletteMetaForm from "./PaletteMetaForm";

import styles from "./styles/NewPaletteFormNavStyles";

/*
//moved to styles/NewPaletteFormNavStyles.js

const drawerWidth = 400;

const styles = (theme) => ({
//...
});
*/

class NewPaletteFormNav extends Component {
  //its better approach to move state.newPaletteName to PaletteMetaForm dialog, because there is no other use here
  // state = {
  //   newPaletteName: "",
  // };

  //moved to the PaletteMetaForm.js
  // componentDidMount() {
  //   ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
  //     this.props.palettes.every(
  //       ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
  //     )
  //   );
  // }

  //since we have moved the state.newPaletteName to PaletteMetaForm, then there is no use here
  // handleChange = (evt) => {
  //   //this.setState({ newPaletteName: evt.target.value });
  //   this.setState({ [evt.target.name]: evt.target.value });
  // };

  state = { formDialogShowing: false };

  //handleClickOpen = () => {
  showForm = () => {
    this.setState({ formDialogShowing: true });
  };

  hideForm = () => {
    this.setState({ formDialogShowing: false });
  };

  render() {
    const {
      classes,
      open,
      handleSave,
      handleDrawerOpen,
      palettes,
    } = this.props;
    //const { newPaletteName } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create New Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            {/* 
            //all this code moved to the PaletteMetaForm.js
            <ValidatorForm onSubmit={() => handleSave(newPaletteName)}>
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
              />
              <Button
                variant="contained"
                color="primary"
                //onClick={this.savePalette}
                type="submit"
              >
                Save Palette
              </Button>
            </ValidatorForm>
 */}
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>

            {/* Open form dialog */}
            <Button
              variant="contained"
              color="primary"
              //onClick={this.handleClickOpen}
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>

        {this.state.formDialogShowing && (
          <PaletteMetaForm
            //handleChange={this.handleChange}
            handleSavePalette={handleSave}
            //newPaletteName={newPaletteName}
            palettes={palettes}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

//export default NewPaletteFormNav;
export default withStyles(styles, { withTheme: true })(NewPaletteFormNav);
