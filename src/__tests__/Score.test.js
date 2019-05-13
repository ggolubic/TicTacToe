import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Score from "../components/Score";

describe("Score component", () => {
  it("Should render with default props", () => {
    const component = renderer.create(<Score />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("Should render with passed props", () => {
    const component = renderer.create(
      <Score score={{ x: 1, o: 1, draw: 0 }} />
    );
    expect(component).toMatchSnapshot();
  });
});
