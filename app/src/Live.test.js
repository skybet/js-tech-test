import React from "react";
import Live from "./Live";
import { renderWithContext } from "./setupTests";

describe("<Live />", () => {
  test("renders as expected", async () => {
    const { asFragment } = renderWithContext(<Live />);
    expect(asFragment()).toMatchSnapshot();
  });
});
