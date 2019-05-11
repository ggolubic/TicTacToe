import React from "react";
import styled from "styled-components";

const Player = ({ num, score }) => {
  return (
    <ScoreH2 num={num}>
      Player {num}: {score}
    </ScoreH2>
  );
};

const ScoreH2 = styled.h2`
  color: ${props => (props.num === 1 ? "#545454" : "#ffd02d")};
`;

export default Player;
