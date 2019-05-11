import React from "react";
import styled from "styled-components";
import Player from "./Player";

export const Score = ({ score }) => {
  return (
    <ScoreContainer>
      <Player num={1} score={score.x} />
      <Player num={2} score={score.o} />
      <h2>Draw: {score.draw}</h2>
    </ScoreContainer>
  );
};

const ScoreContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  width: 300px;
  margin: 0 auto;
  text-align: center;
  margin-top: 50px;
`;
