import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => {
  const tetromino = TETROMINOS[type];
  return <StyledCell type={type} color={tetromino.color} />;
};

export default Cell;
