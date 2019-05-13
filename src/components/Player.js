import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Player = ({ num, score }) => {
  return (
    <ScoreH2 num={num}>
      Player {num}: {score}
    </ScoreH2>
  );
};

Player.defaultProps = {
  num: 0,
  score: 0
};

Player.propTypes = {
  num: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
};

const ScoreH2 = styled.h2`
  color: ${props => (props.num === 1 ? "#545454" : "#ffd02d")};
`;

export default Player;
