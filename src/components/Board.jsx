import Square from "./Square";
import { useState, useEffect } from "react";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [noWinner, setNoWinner] = useState(false);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    const result = calculateWinner(nextSquares);
    if (result.winner) {
      setWinner(result.winner);
      setWinningSquares(result.winningSquares);
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    if (!winner && !squares.includes(null)) {
      setNoWinner(true);
      setTimeout(() => {
        resetGame();
      }, 5000);
    }
  }, [squares, winner]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setWinningSquares([]);
    setNoWinner(false);
    setXIsNext(true);
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
    setTimeout(() => resetGame(), 5000);
  } else if (noWinner) {
    status = "No Winner!";
    setTimeout(() => resetGame(), 5000);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "10px",
    margin: "0 auto",
    maxWidth: "300px",
  };

  return (
    <>
      <div className="status">{status}</div>
      <div style={boardRowStyle}>
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={winningSquares.includes(index)}
          />
        ))}
      </div>
    </>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return { winner: null, winningSquares: [] };
};

export default Board;
