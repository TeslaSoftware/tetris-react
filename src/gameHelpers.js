export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// TODO: Refactor array filling with object instead of another array
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
