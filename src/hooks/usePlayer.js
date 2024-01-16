import { useState, useCallback } from "react";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";

import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    // Transpose (rows become columns and vice versa)
    const rotatedTetro = matrix.map((unused, index) =>
      matrix.map((column) => column[index])
    );
    // Reverse each row to get a rotated matrix
    if(dir > 0) { 
      return rotatedTetro.map(row => row.reverse());
    }

    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const posX = clonedPlayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1: -1));
      if(offset > clonedPlayer.tetromino[0].length){
        rotate(clonedPlayer.tetromino, -dir);
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
    console.log("Resting player");
    setPlayer({
      //resets to kind of in the middle
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
