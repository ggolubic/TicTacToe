import React from "react";
import styled from "styled-components";

import { Field } from "./components/Field";
import { Score } from "./components/Score";
import Button from "./components/Button";
import Modal from "./components/Modal";

class App extends React.Component {
  state = {
    board: Array(9).fill(null),
    player: "x",
    winner: null,
    score: { x: 0, o: 0, draw: 0 },
    turn: 0
  };

  handleTurn = index => {
    let newBoard = this.state.board;
    if (newBoard[index] === null && !this.state.winner) {
      newBoard[index] = this.state.player;
      this.setState(prevState => ({
        board: newBoard,
        player: this.state.player === "x" ? "o" : "x",
        turn: prevState.turn + 1
      }));
      this.checkWinner();
    }
  };

  checkWinner() {
    let winCombos = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"]
    ];
    this.checkMatch(winCombos);
  }

  checkMatch(winCombos) {
    for (let index = 0; index < winCombos.length; index++) {
      const [a, b, c] = winCombos[index];
      let board = this.state.board;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        let score = this.increaseScore();
        this.setState({
          winner: this.state.player,
          score: score
        });
      }
    }
    if (this.state.turn === 8) {
      let newScore = { ...this.state.score };
      newScore.draw += 1;
      this.setState({ score: newScore });
    }
  }

  increaseScore = () => {
    let newScore = { ...this.state.score };
    newScore[this.state.player]++;
    return newScore;
  };

  newGame = () => {
    const board = Array(9).fill(null);
    this.setState(prevState => ({
      board: board,
      player: prevState.winner === "x" ? "o" : "x",
      winner: null,
      turn: 0
    }));
  };

  resetScore = () => {
    const board = Array(9).fill(null);
    this.setState({
      board: board,
      player: "x",
      winner: null,
      score: { x: 0, o: 0, draw: 0 },
      turn: 0
    });
  };

  render() {
    const { board, player, score, winner } = this.state;
    return (
      <>
        {winner && (
          <Modal
            score={score}
            newGame={this.newGame}
            resetScore={this.resetScore}
          />
        )}
        <Title>Tic Tac Toe App</Title>
        <Score score={score} />
        <Board>
          {board.map((field, index) => (
            <Field
              key={index}
              player={player}
              handleTurn={() => this.handleTurn(index)}
              content={field}
            >
              {field}
            </Field>
          ))}
        </Board>
        <NewGameArea>
          <Button new onClick={this.newGame}>
            New Round
          </Button>
          <Button onClick={this.resetScore}>Reset Score</Button>
        </NewGameArea>
      </>
    );
  }
}

export default App;

const Board = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  width: 330px;
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  text-align: center;
`;

export const NewGameArea = styled.div`
  text-align: center;
`;
