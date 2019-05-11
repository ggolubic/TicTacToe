import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

export const Field = props => {
  return (
    <FieldDiv
      player={props.player}
      onClick={props.handleTurn}
      content={props.content}
      size={props.size}
    >
      <h2>{props.children}</h2>
    </FieldDiv>
  );
};

Field.propTypes = {
  player: PropTypes.oneOf(["x", "o"]),
  content: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  handleTurn: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

const FieldDiv = styled.div`
  background-color: ${props => {
    if (props.content === "") return "#14bdac";
    else if (props.content === "x") return "#545454";
    else return "#ffd02d";
  }};
  margin: 5px;
  position: relative;
  width: calc(100% / ${props => props.size} - 15px);
  height: calc(100% / ${props => props.size} - 15px);
  border-radius: 10%;
  text-align: center;
  ${props =>
    !props.content &&
    css`
      &:hover {
        background: ${props => (props.player === "x" ? "#545454" : "#ffd02d")};
        transition: 0.3s;
        cursor: pointer;
      }
    `};

  h2 {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    padding: 0;
    font-size: 5vw;
  }
  @media (max-width: 1000px) {
    h2 {
      top: 40%;
    }
  }
`;
