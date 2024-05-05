import { useState } from "react";
import propTypes from "prop-types";

const Square = ({ value, onSquareClick, isWinningSquare }) => {
  const [hover, setHover] = useState(false);

  const getBackgroundColor = () => {
    if (isWinningSquare) {
      return "green";
    } else if (hover) {
      return "#646cff";
    }
    return "white";
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: 200,
    fontFamily: "inherit",
    backgroundColor: getBackgroundColor(),
    border: "2px solid",
    borderRadius: "8px",
    transition: "background-color 0.25s, border-color 0.25s",
    width: "25%",
    height: "100px",
    margin: "0.5%",
  };

  return (
    <button
      style={buttonStyle}
      onClick={onSquareClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {value}
    </button>
  );
};

Square.propTypes = {
  value: propTypes.string,
  onSquareClick: propTypes.func.isRequired,
  isWinningSquare: propTypes.bool,
};

export default Square;
