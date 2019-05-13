import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

import App from "../App";
import Field from "../components/Field";

Enzyme.configure({ adapter: new Adapter() });

describe("App component", () => {
  it("Should render correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render x*x fields if board size is x", () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().size).toBe(5);
    expect(wrapper.children().find(Field).length).toBe(25);
  });

  it("handleTurn should update board,increase turn and switch player if board position is empty", () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    expect(wrapper.state("turn")).toBe(0);
    expect(wrapper.state("player")).toBe("x");
    expect(wrapper.state().board[0][0]).toBe("");
    instance.handleTurn(0, 0);
    expect(wrapper.state("turn")).toBe(1);
    expect(wrapper.state("player")).toBe("o");
    expect(wrapper.state().board[0][0]).toBe("x");
  });
  it("handleTurn should do nothing when board position is not empty", () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();

    //set content into board
    instance.handleTurn(0, 0);
    expect(wrapper.state("turn")).toBe(1);
    expect(wrapper.state("player")).toBe("o");
    expect(wrapper.state().board[0][0]).toBe("x");

    //try to set content again, state shouldn't change
    instance.handleTurn(0, 0);
    expect(wrapper.state("turn")).toBe(1);
    expect(wrapper.state("player")).toBe("o");
    expect(wrapper.state().board[0][0]).toBe("x");
  });

  it("checkWinner should return false if turn is not high enough", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    expect(instance.checkWinner("x", 0, 0)).toEqual(false);
  });

  it("checkWinner should return draw if board is full and there is no winner", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({ size: 3 });
    //init at size 3
    instance.initBoard();
    //fill board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        instance.handleTurn(i, j);
      }
    }
    expect(wrapper.state().score.draw).toBe(1);
    expect(wrapper.state("gameDone")).toBe(true);
  });

  it("setWinner should increase score and set gameDone", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    expect(wrapper.state().score.x).toBe(0);
    instance.setWinner();
    expect(wrapper.state().score.x).toBe(1);
    expect(wrapper.state().gameDone).toBe(true);
  });

  it("Should call newGame after clicking on button", () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    //add something on board
    instance.handleTurn(0, 0);
    expect(wrapper.state().board[0][0]).toBe("x");
    //trigger newGame
    wrapper
      .find("button")
      .first()
      .props()
      .onClick();
    //board should be empty
    expect(wrapper.state().board[0][0]).toBe("");
  });

  it("Should call resetScore after clicking on button", () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    //add something on board
    instance.handleTurn(0, 0);
    //add winner
    instance.setWinner();
    expect(wrapper.state().board[0][0]).toBe("x");
    //trigger resetScore
    wrapper
      .find("button")
      .last()
      .props()
      .onClick();
    //board should be empty
    expect(wrapper.state().board[0][0]).toBe("");
    //winner should be null
    expect(wrapper.state().winner).toBe(null);
  });
});
