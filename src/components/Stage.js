import React from "react";
import { StyledStage } from "./styles/StyledStage";

import Cell from "./Cell";

// TODO: Improve indexing of cells by using row index value

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) =>
      row.map((currentCell, cellIndex) => (
        <Cell key={cellIndex} type={currentCell[0]} />
      ))
    )}
  </StyledStage>
);

export default Stage;
