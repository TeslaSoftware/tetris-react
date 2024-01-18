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
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

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
    setDropTime(1000);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const getDropTime = () => 1000 / (level + 1) + 200;

  const drop = () => {
    // Increase level when player cleared 10 rows
    if(rows > (level + 1) *10 ) {
      setLevel(prev => prev + 1);
      //Also increase the speed
      setDropTime(getDropTime());
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      console.log("dropping player did not collide");
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      console.log("dropping player caused collision");
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = (event) => {
    const keyCode = event.keyCode;
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(getDropTime());
      }
    }
  };

  const dropPlayer = () => {
    console.log("dropping player");
    setDropTime(null);
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

  useInterval(() => {
    drop();
  }, dropTime);

  const gameOverOrGameDisplay = gameOver ? (
    <Display gameOver={gameOver} text="Game Over" />
  ) : (
    <div>
      <Display text={`Score: ${score}`}></Display>
      <Display text={`Rows: ${rows}`}></Display>
      <Display text={`Level: ${level}`}></Display>
    </div>
  );

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(event) => move(event)}
      onKeyUp={keyUp}
    >
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
