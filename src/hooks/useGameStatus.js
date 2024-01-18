import { useState, useEffect, useCallback } from "react";

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      const linePoints = [40, 100, 300, 1200];

      // This is how original Tetris score is calculated
      setScore((prev) => {
        const points = linePoints[rowsCleared - 1];
        const pointsScored = points * (level + 1);
        return prev + pointsScored;
      });
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
