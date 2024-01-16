import React, { useState } from "react";

// Styled components
import { createStage } from "../gameHelpers";
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

  const [player,updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("re-remder");

  const movePlayer = dir => {
    updatePlayerPos({x: dir, y: 0})
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({x: 0, y: 1, collided: false});
  }

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keyCode }) => {
      if(!gameOver) {
          // 37 is left arrow on keyboard
          if(keyCode === 37) {
              movePlayer(-1);
          // 39 is right arrow on keyboard
          } else if(keyCode === 39) {
            movePlayer(1)
          // 40 is down arrow on keyboard
          } else if(keyCode === 40) {
            dropPlayer();
          }

      }
      
  }

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
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown = { e=> move(e)} >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOverOrGameDisplay}
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
