import { useState, useCallback } from "react";
import { STAGE_WIDTH } from "../gameHelpers";

import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
      console.log("moving player pos by x = " + x + " y = " + y + " collided = " + collided);
      console.log("NEW POSITION: X = " + (player.pos.x + x) + " Y = " + (player.pos.y + y));
    setPlayer((prevState) => ({
      ...prevState,
      pos: { x: (prevState.pos.x + x), y: (prevState.pos.y + y)},
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    console.log("Resting player");
    setPlayer({
        //resets to kind of in the middle
        pos: {x: STAGE_WIDTH / 2 -2, y: 0},
        tetromino: randomTetromino().shape,
        collided: false,
    })
  }, [])

  return [player, updatePlayerPos, resetPlayer];
};
