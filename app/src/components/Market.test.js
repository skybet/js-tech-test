import React from "react";
import Market from "./Market";
import { renderWithContext } from "../setupTests";

describe("<Market />", () => {
  test("renders as expected", async () => {
    const { asFragment } = renderWithContext(<Market />);
    expect(asFragment()).toMatchSnapshot();
  });
});
