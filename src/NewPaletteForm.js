import React, { Component } from "react";
import clsx from "clsx";
//import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import { withStyles, withTheme } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import DraggableColorBox from "./DraggableColorBox"; //moved to inside DraggableColorList.js
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import NewPaletteFormNav from "./NewPaletteFormNav";
import NewPaletteFormColorPicker from "./NewPaletteFormColorPicker";
import seedColors from "./seedColors";
import styles from "./styles/NewPaletteFormStyles";

/*
//moved to styles/NewPaletteFormStyles.js

const drawerWidth = 400;

const styles = (theme) => ({
//...
});
*/

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      //currentColor: "teal",  //moved to NewPaletteFormColorPicker.js
      //colors: [{ color: "blue", name: "blue" }],
      //colors: props.palettes[0].colors, //this.props. also works //loading initial palette as using index 0 palette as a template
      //colors: props.palettes[0] ? props.palettes[0].colors : [],
      colors: props.palettes[0]
        ? props.palettes[0].colors
        : seedColors[0].colors,
      //newColorName: "", //moved to NewPaletteFormColorPicker.js
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
    /*
    //moved to NewPaletteFormColorPicker.js
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
    */
    /*
    //moved to NewPaletteFormNav.js
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
    */
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  /*
  //moved to NewPaletteFormColorPicker.js
    updateCurrentColor = (newColor) => {
    console.log(newColor.hex);
    this.setState({ currentColor: newColor.hex });
  };
  */

  //addNewColor = () => {
  addNewColor = (newColor) => {
    // const newColor = {
    //   color: this.state.currentColor,
    //   name: this.state.newColorName,
    // };
    //this.setState({ colors: [...this.state.colors, this.state.currentColor] });
    this.setState({
      colors: [...this.state.colors, newColor],
      //newColorName: "",
    });
  };

  //No need to use here anymore, this function moved to NewPaletteFormNav.js and NewPaletteFormColorPicker.js
  /*
  handleChange = (evt) => {
    //this.setState({ newColorName: evt.target.value });
    //this.setState({ newPaletteName: evt.target.value });
    this.setState({ [evt.target.name]: evt.target.value });
  };
  */

  /*
  //this method below might be named as "handleSubmit"
  //savePalette = () => {
  //savePalette = (newPaletteName) => {
  savePalette = (newPaletteNameAndEmoji) => {
    //App.js is the place where keeping the track of all palettes
    //savePalette send as a prop from App to this component
    //const newName = "New Test Palette";
    //const newName = this.state.newPaletteName; //not possible anymore
    const newPalette = {
      //paletteName: newName,
      //paletteName: newPaletteName,
      paletteName: newPaletteNameAndEmoji.paletteName,
      emoji: newPaletteNameAndEmoji.emoji,
      //id: newName.toLowerCase().replace(/ /g, "-"),
      //id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      id: newPaletteNameAndEmoji.paletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors,
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
    //we noticed that this component do not has access to history,
    //so, we have changed the Route calling, added routeProps
  };
*/

  savePalette = (newPalette) => {
    //be careful: newPalette object only contains name & emoji
    //we are adding other info below
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push("/");
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

  /*
  addRandomColor = () => {
    //pick random color from existing Palettes
    //flat joins array of arrays into one single array
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    //console.log(allColors); //PROBLEM: If there is no saved palette then this allColors is []
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({ colors: [...this.state.colors, randomColor] });
  };
  */

  /* 
  //  THIS IS MY SOLUTION TO PREVENT ADDING SAME COLORS RANDOMLY
    addRandomColor = () => {
    //pick random color from existing Palettes
    //flat joins array of arrays into one single array
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    //console.log(allColors); //PROBLEM: If there is no saved palette then this allColors is []
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    const randomColorAlreadyExist = this.state.colors.filter(
      (color) => color.name === randomColor.name
    );
    //console.log(randomColor.name, randomColorAlreadyExist);
    if (randomColorAlreadyExist.length === 0)
      this.setState({ colors: [...this.state.colors, randomColor] });
    else alert("Escaped from adding existing color: " + randomColor.name);
  };
*/

  //  THIS IS THE FINAL BEST SOLUTION TO PREVENT ADDING SAME COLORS RANDOMLY
  addRandomColor = () => {
    //pick random color from existing Palettes
    //flat joins array of arrays into one single array
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    //console.log(allColors); //PROBLEM: If there is no saved palette then this allColors is []
    let rand;
    let randomColor;
    let isRandomColorAlreadyExist = true;
    while (isRandomColorAlreadyExist) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isRandomColorAlreadyExist = this.state.colors.some(
        (color) => color.name === randomColor.name
      );
      //console.log(randomColor);
    }
    this.setState({ colors: [...this.state.colors, randomColor] });
  };

  render() {
    //const classes = useStyles();
    //const theme = useTheme();
    const { classes, maxColors, palettes } = this.props;
    //const { open, colors, currentColor, newColorName } = this.state;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        {/* Navbar moved to NewPaletteFormNav.js */}
        {/* BE CAREFUL: classes directly passed to the NewPaletteFormNav as is, no styling defined in NewPaletteFormNav */}

        <NewPaletteFormNav
          open={open}
          //classes={classes}  //styles added to NewPaletteFormNav.js
          palettes={palettes}
          handleSave={this.savePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />
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
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={isPaletteFull}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            {/* ColorPicker & ValidatorForm(ColorName field + AddColor button) moved to the NewPaletteFormColorPicker.js */}
            <NewPaletteFormColorPicker
              isPaletteFull={isPaletteFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
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
            colors={colors}
            removeColor={this.removeColor}
            axis="xy" //draggable both horizontal & vertical
            onSortEnd={this.onSortEnd}
            distance={20} //drag is not counted as a drag movement unless it is more than 20px
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
