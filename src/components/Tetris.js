import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

// Styled components
import { createStage, wouldCollide } from "../gameHelpers";
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

  const movePlayer = (dir) => {
    //Only move player position if not collided
    if (!wouldCollide(player, stage, { x: dir, y: 0 })) {
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

  const drop = (dropDistance = 1) => {
    // Increase level when player cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      //Also increase the speed
      setDropTime(getDropTime());
    }
    if (wouldCollide(player, stage, { x: 0, y: dropDistance })) {
      // Game Over
      if (player.pos.y === 0) {
        setGameOver(true);
        setDropTime(null);
      } 
      
      updatePlayerPos({ x: 0, y: 0, collided: true });
    } else {
      updatePlayerPos({ x: 0, y: dropDistance });
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => swipeVertically(eventData.deltaX),
    onSwipedRight: (eventData) => swipeVertically(eventData.deltaX),
    onSwipedDown: (eventData) => SwipeDown(eventData.deltaY),
    onTap: () => playerRotate(stage, 1),
  });

  const SwipeDown = (swipeDistance) => {
    const maxDropDistance = Math.round(swipeDistance / 100);

    // Find out max distance at which we can drop.
    // This is necessary because the player position does not update wihtin the loop.
    let dropDistance = 1;
    while (dropDistance < maxDropDistance
      && !wouldCollide(player, stage, { x: 0, y: dropDistance + 1 })) {
      dropDistance++;
    }

    drop(dropDistance);
  }

  const swipeVertically = (swipeDistance) => {
    const moveVal = Math.round(swipeDistance / 100);
    console.log(moveVal);
    const direction = moveVal < 0 ? -1 : 1;

    // Find the furthest position based on swipe distance where player can move
    // Then move to that position and break out of the loop;
    for (let move = Math.abs(moveVal); move > 0; move--) {
      if (!wouldCollide(player, stage, { x: move * direction, y: 0 })) {
        updatePlayerPos({ x: move * direction, y: 0 });
        break;
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  const asideContent = gameOver ? (
    <aside>
      <Display gameOver={gameOver} text="Game Over" />
      <StartButton callback={startGame} />
    </aside>
  ) : (
    <aside>
      <Display text={`Score: ${score}`}></Display>
      <Display text={`Rows: ${rows}`}></Display>
      <Display text={`Level: ${level}`}></Display>
      <StartButton callback={startGame} />
    </aside>
  );

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(event) => move(event)}
      onKeyUp={keyUp}
      {...swipeHandlers}
    >
      <StyledTetris>
        <Stage stage={stage} />
        {asideContent}
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
