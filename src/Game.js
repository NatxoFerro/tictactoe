import React from 'react';
import Board from './Board';
import { calculateWinner as isWinner, calculatePosition } from './functions';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastSquare: null
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const stepNumber = this.state.stepNumber + 1;
    const history = this.state.history.slice(0, stepNumber);
    const squares = history[history.length - 1].squares.slice();
    if (isWinner(squares) || squares[i])
      return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        lastSquare: calculatePosition(i)
      }]),
      stepNumber: stepNumber,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);
    this.setState({
      history: history,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = isWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      const pos = step.lastSquare;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc} {pos}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner is ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

}

export default Game;