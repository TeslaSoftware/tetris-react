import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsClear, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage => newStage.reduce((acc, row) => {
      const isRowFilled = row.findIndex(cell => cell[0] === 0) === -1;
      if(isRowFilled){
        setRowsCleared(prev => prev +1);
        // Add empty row at the top of the array
        const emptyRow = new Array(newStage[0].length).fill([0, 'clear']);
        acc.unshift(emptyRow);
        return acc;
      }
      acc.push(row);
      return acc;
    }, []);

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      //Then draw tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      // Then check if we collided
      if(player.collided) {
          resetPlayer();
          return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prevStageState) => updateStage(prevStageState));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsClear];
};
