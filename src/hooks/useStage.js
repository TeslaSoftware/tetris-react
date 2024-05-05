import { useState, useEffect, useCallback } from "react";
import { createStage } from "../gameHelpers";
import { CELL_CLEAR, CELL_FILLED, STAGE_WIDTH } from "../constants";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsClear, setRowsCleared] = useState(0);

  const getEmptyCell = () => [0, CELL_CLEAR];

  const sweepRows = useCallback((newStage) => {
    const getEmptyRow = () => new Array(STAGE_WIDTH).fill(getEmptyCell());

    return newStage.reduce((acc, row) => {
      //If at least one cell has value 0 then row is not filled
      const isRowFilled = row.findIndex(cell => cell[0] === 0) === -1;
      if (isRowFilled) {
        setRowsCleared((prev) => prev + 1);
        // Add empty row at the begining of the array (top of the stage), but skip current row that is filled and do not add it at the end of array
        const emptyRow = getEmptyRow();
        acc.unshift(emptyRow);
      } else {
        // If row is not filled push the row as is (at the end of array)
        acc.push(row);
      }

      return acc;
    }, []);
  }, []);

  const updateStage = useCallback(
    (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) =>
          cell[1] === CELL_CLEAR ? getEmptyCell() : cell
        )
      );

      //Then draw tetromino
      player.tetromino.forEach((tetrominoRow, rowIndex) => {
        tetrominoRow.forEach((tetrominoCellValue, cellIndex) => {
          // Skip empty cell - no need to update it
          if (tetrominoCellValue !== 0) {
            const updatedY = rowIndex + player.pos.y;
            const updatedX = cellIndex + player.pos.x;
            const newCellStatus = player.collided
              ? CELL_FILLED
              : CELL_CLEAR;
            newStage[updatedY][updatedX] = [tetrominoCellValue, newCellStatus];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        // Reset player only if collided at position larger than 0, else is game over.
        if(player.pos.y > 0){
          resetPlayer();
        }
        
        return sweepRows(newStage);
      }

      return newStage;
    },
    [player, resetPlayer, sweepRows]
  );

  useEffect(() => {
    setRowsCleared(0);
    setStage((prevStageState) => updateStage(prevStageState));
  }, [player, resetPlayer, updateStage]);

  return [stage, setStage, rowsClear];
};
