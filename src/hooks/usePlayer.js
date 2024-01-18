import { useState, useCallback } from "react";
import { checkCollision } from "../gameHelpers";
import {STAGE_WIDTH} from "../constants";

import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, direction) => {
    // Transpose (rows become columns and vice versa)
    const rotatedMatrix = matrix.map((unused, rowIndex) =>
      matrix.map((column) => column[rowIndex])
    );
    // Reverse each row to get a rotated matrix
    if(direction > 0) { 
      return rotatedMatrix.map(row => row.reverse());
    }

    return rotatedMatrix.reverse();
  };

  const playerRotate = (stage, direction) => {
    // Deep clone Player object
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    const posX = clonedPlayer.pos.x;
    let offset = 1;
    // Move the tetromino until it does not collide
    while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1: -1));
      const tetrominoWidth =  clonedPlayer.tetromino[0].length;
      if(offset > tetrominoWidth){
        rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.pos.x = posX;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    console.log(
      "moving player pos by x = " + x + " y = " + y + " collided = " + collided
    );
    console.log(
      "NEW POSITION: X = " + (player.pos.x + x) + " Y = " + (player.pos.y + y)
    );
    setPlayer((prevState) => {
      const newX = prevState.pos.x + x;
      const newY = prevState.pos.y + y;
      const newPostion = { x: newX, y: newY };
      return {
        ...prevState,
        pos: newPostion,
        collided,
      };
    });
  };

  const resetPlayer = useCallback(() => {
    console.log("Reseting player");
    setPlayer({
      //resets to kind of in the middle
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
