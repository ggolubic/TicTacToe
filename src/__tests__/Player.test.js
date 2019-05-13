import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

import Player from "../components/Player";

Enzyme.configure({ adapter: new Adapter() });

describe("Player component", () => {
  it("Should render correctly with default props", () => {
    const tree = renderer.create(<Player />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render correctly with passed props", () => {
    const props = setup();
    const tree = renderer.create(<Player {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should display correct color depending on player", () => {
    const { score } = setup();
    const player1 = mount(<Player num={1} score={score} />);
    expect(player1).toHaveStyleRule("color", "#545454");
    player1.unmount();
    const player2 = mount(<Player num={2} score={score} />);
    expect(player2).toHaveStyleRule("color", "#ffd02d");
    player2.unmount();
  });
});

function setup() {
  const props = {
    num: 1,
    score: 0
  };
  return { ...props };
}
