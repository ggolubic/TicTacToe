import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Player from "./Player";

const Score = ({ score }) => {
  return (
    <ScoreContainer>
      <Player num={1} score={score.x} />
      <Player num={2} score={score.o} />
      <h2>Draw: {score.draw}</h2>
    </ScoreContainer>
  );
};

Score.defaultProps = {
  score: { x: 0, o: 0, draw: 0 }
};

Score.propTypes = {
  score: PropTypes.shape({
    x: PropTypes.number.isRequired,
    o: PropTypes.number.isRequired,
    draw: PropTypes.number.isRequired
  })
};

export default Score;

const ScoreContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  width: 300px;
  margin: 0 auto;
  text-align: center;
  margin-top: 50px;
`;
