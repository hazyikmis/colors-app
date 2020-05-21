import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

//const DraggableColorList = ({ colors, removeColor }) => {
//covered all method inside "SortableContainer"
const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {/* {colors.map((color, index) => ( */}
      {colors.map((color, index) => (
        //<DraggableColorBox color={color} />
        <DraggableColorBox
          index={index}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;

//export default SortableContainer(DraggableColorList);
//this also works, without covering all method inside a SortableContainer when definition
