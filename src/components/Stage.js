import React from "react";

import Cell from "./Cell";

// TODO: Improve indexing of cells by using row index value
const Stage = ({ stage }) => (
  <div>
    {stage.map((row) =>
      row.map((currentCell, cellIndex) => (
        <Cell key={cellIndex} type={currentCell[0]} />
      ))
    )}
  </div>
);

export default Stage;
