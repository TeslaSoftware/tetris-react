import { CELL_CLEAR, STAGE_WIDTH, STAGE_HEIGHT } from "./constants";

// TODO: Refactor array filling with object instead of another array
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, CELL_CLEAR])
  );

export const wouldCollide = (player, stage, { x: moveX, y: moveY }) => {
  console.log("Would collide " + moveX + " " + moveY);
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 1. Check that we are on an actual tetromino cell, instead of empty cell
      if (player.tetromino[y][x] !== 0) {
        if (
          //2. Check that the current move is not passing through bottom of play area
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that the current move is inside the game area (x axis)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check if the cell destination of the current move is not set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
           CELL_CLEAR
        ) {
          return true;
        }
      }
    }
  }
  return false;
};