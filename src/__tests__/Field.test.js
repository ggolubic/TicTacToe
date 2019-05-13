import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

import Field from "../components/Field";

Enzyme.configure({ adapter: new Adapter() });

describe("Field component", () => {
  it("Should render correctly with default props", () => {
    const tree = renderer.create(<Field />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render correctly with passed props", () => {
    const props = setup();
    const tree = renderer
      .create(<Field {...props}>{props.content}</Field>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render with the correct styles", () => {
    const { content, ...props } = setup();

    let component = mount(
      <Field content="" {...props}>
        {content}
      </Field>
    );
    //if nobody clicked, render greenish background
    expect(component).toHaveStyleRule("background-color", "#14bdac");

    let componentWithX = mount(
      <Field content="x" {...props}>
        {content}
      </Field>
    );
    //if player x clicked render greyish background
    expect(componentWithX).toHaveStyleRule("background-color", "#545454");

    let componentWithO = mount(
      <Field content="o" {...props}>
        {content}
      </Field>
    );
    //if player o clicked render yellowish background
    expect(componentWithO).toHaveStyleRule("background-color", "#ffd02d");

    component.unmount();
  });

  it("Should call props.onClick when div is clicked", () => {
    const { handleTurn, ...props } = setup();
    const component = mount(
      <Field handleTurn={handleTurn} {...props}>
        ""
      </Field>
    );
    // Test before event
    expect(handleTurn).not.toHaveBeenCalled();

    // simulate the click event
    component
      .find("div")
      .props()
      .onClick();
    // Test after event
    expect(handleTurn).toHaveBeenCalled();

    component.unmount();
  });
});

function setup() {
  const mockFunction = jest.fn();
  const props = {
    player: "x",
    handleTurn: mockFunction,
    content: "x",
    size: 5
  };
  return { ...props };
}
