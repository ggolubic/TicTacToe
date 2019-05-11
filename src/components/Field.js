import React from "react";
import styled, { css } from "styled-components";

export const Field = props => {
  return (
    <FieldDiv
      player={props.player}
      onClick={props.handleTurn}
      content={props.content}
    >
      {props.children}
    </FieldDiv>
  );
};

const FieldDiv = styled.div`
  background-color: ${props => {
    if (props.content === null) return "#14bdac";
    else if (props.content === "x") return "#545454";
    else return "#ffd02d";
  }};
  margin: 5px;
  height: 100px;
  width: 100px;
  border-radius: 10%;
  font-size: 5rem;
  text-align: center;
  line-height: 75px;
  ${props =>
    !props.content &&
    css`
      &:hover {
        background: ${props => (props.player === "x" ? "#545454" : "#ffd02d")};
        transition: 0.3s;
        cursor: pointer;
      }
    `}
`;
