import React, { Component } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
//import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import { withStyles, withTheme } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";

import { ChromePicker } from "react-color";

import Button from "@material-ui/core/Button";
//import DraggableColorBox from "./DraggableColorBox"; //moved to inside DraggableColorList.js

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    height: `calc(100vh - 64px)`,
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      //colors: [{ color: "blue", name: "blue" }],
      colors: props.palettes[0].colors, //this.props. also works //loading initial palette as using index 0 palette as a template
      newColorName: "",
      newPaletteName: "",
    };
  }
  //state = { open: false };

  componentDidMount() {
    // custom rule will have name 'isColorNameUnique'
    /*
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      //return this.state.colors.every((color) => color.name !== value);
      return this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    */
    //YOU NOTICED THE DIFFERENCE BETWEEN THE COMMENTED CODE ABOVE AND THIS BELOW;
    //there is {return ...} above, but no {} and because of that no "return" below
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      //BE CAREFUL: We are not using the TextField's "value", we are using the ChromePickers color value which is in the state (currentColor)
      this.state.colors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currentColor.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (newColor) => {
    console.log(newColor.hex);
    this.setState({ currentColor: newColor.hex });
  };

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    //this.setState({ colors: [...this.state.colors, this.state.currentColor] });
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: "",
    });
  };

  handleChange = (evt) => {
    //this.setState({ newColorName: evt.target.value });
    //this.setState({ newPaletteName: evt.target.value });
    this.setState({ [evt.target.name]: evt.target.value });
  };

  //this method below might be named as "handleSubmit"
  savePalette = () => {
    //App.js is the place where keeping the track of all palettes
    //savePalette send as a prop from App to this component
    //const newName = "New Test Palette";
    const newName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors,
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
    //we noticed that this component do not has access to history,
    //so, we have changed the Route calling, added routeProps
  };

  removeColor = (colorName) => {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors = () => {
    this.setState({ colors: [] });
  };

  addRandomColor = () => {
    //pick random color from existing Palettes
    //flat joins array of arrays into one single array
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({ colors: [...this.state.colors, randomColor] });
  };

  render() {
    //const classes = useStyles();
    //const theme = useTheme();
    const { classes } = this.props;
    const { open } = this.state;
    const isPaletteFull = this.state.colors.length >= this.props.maxColors;
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
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.savePalette}>
              <TextValidator
                label="Palette Name"
                name="newPaletteName" //required for single "handleChange" event for all
                value={this.state.newPaletteName}
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
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColor}
              disabled={isPaletteFull}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newColorName}
              name="newColorName" //required for single "handleChange" event for all
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]} //order matters!
              errorMessages={[
                "enter a color name",
                "color name must be unique",
                "color already in the palette",
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: isPaletteFull
                  ? "grey"
                  : this.state.currentColor,
              }}
              //onClick={this.addNewColor}
              type="submit"
              disabled={isPaletteFull}
            >
              {isPaletteFull ? "Palette Full" : "Add Color"}
              {/* Add Color */}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/*
          <ul>
            {this.state.colors.map((color) => (
              <li style={{ backgroundColor: color }}>{color}</li>
            ))}
          </ul>
          */}
          {/* 
          this.state.colors.map((color) => (
            //<DraggableColorBox color={color} />
            <DraggableColorBox
              key={color.name}
              color={color.color}
              name={color.name}
              handleClick={() => this.removeColor(color.name)}
            />
          ))
          */}
          <DraggableColorList
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis="xy" //draggable both horizontal & vertical
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
