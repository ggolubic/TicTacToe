import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

import Modal from "../components/Modal";

Enzyme.configure({ adapter: new Adapter() });

describe("Modal component", () => {
  it("Should render correctly with default props", () => {
    const tree = renderer.create(<Modal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render correctly with passed props", () => {
    const props = setup();
    const tree = renderer.create(<Modal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should call newGame when first button is clicked", () => {
    const { newGame, ...props } = setup();
    const component = mount(<Modal newGame={newGame} {...props} />);

    // Test before event
    expect(newGame).not.toHaveBeenCalled();

    // simulate the click event
    component
      .find("button")
      .first()
      .props()
      .onClick();
    // Test after event
    expect(newGame).toHaveBeenCalled();

    component.unmount();
  });
  it("Should call resetScore when second button is clicked", () => {
    const { resetScore, ...props } = setup();
    const component = mount(<Modal resetScore={resetScore} {...props} />);

    // Test before event
    expect(resetScore).not.toHaveBeenCalled();

    // simulate the click event
    component
      .find("button")
      .last()
      .props()
      .onClick();
    // Test after event
    expect(resetScore).toHaveBeenCalled();

    component.unmount();
  });
});

function setup() {
  const props = {
    score: { x: 0, o: 0, draw: 0 },
    winner: null,
    newGame: jest.fn(),
    resetScore: jest.fn()
  };
  return { ...props };
}
