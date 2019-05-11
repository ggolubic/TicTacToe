import styled, { css } from "styled-components";

const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  border-radius: 4%;
  background: transparent;
  border: 2px solid #ddbc95;
  color: #ddbc95;
  margin: 0 1rem;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  transition: 0.3s;
  cursor: pointer;
  outline: none;

  &:hover {
    color: white;
    background: #ddbc95;
    transition: 0.3s;
  }
  ${props =>
    props.new &&
    css`
      background: #ddbc95;
      color: white;
      &:hover {
        color: #ddbc95;
        background: white;
        transition: 0.3s;
      }
    `};
`;

export default Button;
