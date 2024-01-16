import React, { useState } from "react";

// Styled components
import { createStage, checkCollision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-remder");

  const movePlayer = (dir) => {
    //Only move player position if not collided
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      console.log("dropping player did not collide");
      updatePlayerPos({ x: 0, y: 1, collided: false });      
    } else {
      console.log("dropping player caused collision");
      // Game Over
      if(player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x: 0, y: 0, collided: true});
    }
  };

  const dropPlayer = () => {
      console.log("dropping player");
    drop();
  };

  const move = (event) => {
    const keyCode = event.keyCode;
    if (!gameOver) {
      // 37 is left arrow on keyboard
      if (keyCode === 37) {
        movePlayer(-1);
        // 39 is right arrow on keyboard
      } else if (keyCode === 39) {
        movePlayer(1);
        // 40 is down arrow on keyboard
      } else if (keyCode === 40) {
        dropPlayer();
        // 38 is up arrow on keyboard
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  const gameOverOrGameDisplay = gameOver ? (
    <Display gameOver={gameOver} text="Game Over" />
  ) : (
    <div>
      <Display text="Score"></Display>
      <Display text="Rows"></Display>
      <Display text="Level"></Display>
    </div>
  );

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOverOrGameDisplay}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
