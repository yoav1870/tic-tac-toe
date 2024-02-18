import "./App.css";
import Board from "./components/Board";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <div className="board-row">
          <Board />
        </div>
      </header>
    </div>
  );
};

export default App;
