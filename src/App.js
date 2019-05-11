import React from "react";
import styled from "styled-components";

import { Field } from "./components/Field";
import { Score } from "./components/Score";
import Button from "./components/Button";
import Modal from "./components/Modal";

class App extends React.Component {
  state = {
    board: [],
    player: "x",
    winner: null,
    score: { x: 0, o: 0, draw: 0 },
    turn: 0,
    size: 5,
    maxTurn: 0,
    gameDone: false
  };

  componentDidMount() {
    this.initBoard();
  }

  initBoard = () => {
    const board = [];
    const size = this.state.size;
    const maxTurn = size * size - 1;
    for (let i = 0; i < size; i++) {
      board[i] = Array(size).fill("");
    }
    this.setState({ board: board, maxTurn: maxTurn });
  };

  handleTurn = (index, parentIndex) => {
    let newBoard = [...this.state.board];
    if (newBoard[parentIndex][index] === "" && !this.state.winner) {
      newBoard[parentIndex][index] = this.state.player;
      this.setState(prevState => ({
        board: newBoard,
        player: this.state.player === "x" ? "o" : "x",
        turn: prevState.turn + 1
      }));
      this.checkWinner(this.state.player);
    }
  };

  checkWinner = player => {
    const turn = this.state.turn;
    const size = this.state.size;
    const maxTurn = this.state.maxTurn;
    if (turn < size * 2 - 2) return false;
    if (this.checkHorizontalWin(player)) this.setWinner();
    else if (this.checkVerticalWin(player)) this.setWinner();
    else if (this.checkDiagonalWin(player)) this.setWinner();
    else if (turn === maxTurn) this.setDraw();
    else return false;
  };

  checkHorizontalWin = player => {
    const size = this.state.size;
    const board = [...this.state.board];
    for (let row = 0; row < size; row++) {
      let total = 0;
      for (let col = 0; col < size; col++) {
        total += board[row][col].charCodeAt();
      }
      if (total % player.charCodeAt() === 0) return true;
    }
  };

  checkVerticalWin = player => {
    const size = this.state.size;
    const board = [...this.state.board];
    for (let col = 0; col < size; col++) {
      let total = 0;
      for (let row = 0; row < size; row++) {
        total += board[row][col].charCodeAt();
      }
      if (total % player.charCodeAt() === 0) return true;
    }
  };

  checkDiagonalWin = player => {
    let total = 0;
    const size = this.state.size;
    const board = [...this.state.board];
    for (let i = 0; i < size; i++) {
      total += board[i][i].charCodeAt();
    }
    if (total % player.charCodeAt() === 0) return true;
    total = 0;
    for (let j = 0; j < size; j++) {
      total += board[j][size - j - 1].charCodeAt();
    }
    if (total % player.charCodeAt() === 0) return true;
  };

  increaseScore = () => {
    let newScore = { ...this.state.score };
    newScore[this.state.player]++;
    return newScore;
  };

  setWinner = () => {
    let score = this.increaseScore();
    this.setState({
      winner: this.state.player,
      score: score,
      gameDone: true
    });
  };

  setDraw = () => {
    let newScore = { ...this.state.score };
    newScore.draw += 1;
    this.setState({ score: newScore, gameDone: true });
  };

  newGame = () => {
    this.initBoard();
    this.setState(prevState => ({
      player: prevState.winner === "x" ? "o" : "x",
      winner: null,
      turn: 0,
      gameDone: false
    }));
  };

  resetScore = () => {
    this.initBoard();
    this.setState({
      player: "x",
      winner: null,
      score: { x: 0, o: 0, draw: 0 },
      turn: 0,
      gameDone: false
    });
  };

  render() {
    const { board, player, score, winner, size, gameDone } = this.state;
    return (
      <>
        {gameDone && (
          <Modal
            score={score}
            winner={winner}
            newGame={this.newGame}
            resetScore={this.resetScore}
          />
        )}
        <Title>Tic Tac Toe App</Title>
        <Score score={score} />
        <Board>
          {board.map((fieldSet, parentIndex) => {
            return fieldSet.map((field, index) => (
              <Field
                key={index}
                player={player}
                handleTurn={() => this.handleTurn(index, parentIndex)}
                content={field}
                size={size}
              >
                {field}
              </Field>
            ));
          })}
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
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  width: 50vw;
  height: 50vw;
  @media (min-width: 1000px) {
    width: 40vw;
    height: 30vw;
    transition: 0.3s;
  }
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  text-align: center;
`;

export const NewGameArea = styled.div`
  text-align: center;
  margin-top: 50px;
`;
