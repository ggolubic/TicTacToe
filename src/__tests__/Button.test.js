import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";
import Button from "../components/Button";

Enzyme.configure({ adapter: new Adapter() });

describe("Button component", () => {
  it("renders without props correctly", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with props correctly", () => {
    const tree = renderer.create(<Button new />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render passed text", () => {
    const component = mount(<Button>"Thing"</Button>);
    expect(component.find("button").text()).toContain("Thing");
    component.unmount();
  });

  it("should call props.onClick when button is clicked", () => {
    const mockFunction = jest.fn();
    const component = mount(<Button onClick={mockFunction} />);
    // Test before event
    expect(mockFunction).not.toHaveBeenCalled();

    // simulate the click event
    component.find("button").simulate("click");

    // Test after event
    expect(mockFunction).toHaveBeenCalled();
    component.unmount();
  });
});
