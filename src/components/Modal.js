import React from "react";
import styled from "styled-components";

import { Score } from "./Score";
import { Title } from "../App";
import Button from "./Button";

const Modal = ({ score, newGame, resetScore }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <Title>You won!</Title>
        <div>
          <ScoreArea>
            <SubTitle>Current Score:</SubTitle>
            <Score score={score} />
          </ScoreArea>

          <ModalNewGame>
            <Button new onClick={() => newGame()}>
              New Round
            </Button>
            <Button onClick={() => resetScore()}>Reset Score</Button>
          </ModalNewGame>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5%;
  width: 450px;
  height: 400px;
  background: white;
  transition: all 350ms cubic-bezier(0.68, -0.55, 0.265, 1.18);
`;

const ScoreArea = styled.div`
  text-align: center;
`;

const SubTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  text-align: center;
`;

const ModalNewGame = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export default Modal;
