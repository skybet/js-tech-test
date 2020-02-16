import React from "react";
import { renderWithContext } from "../setupTests";
import Outcome from "./Outcome";

describe("<Outcome />", () => {
  test("renders fractional odds as expected", async () => {
    const { asFragment } = renderWithContext(<Outcome />, "fractional");
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders decimal odds as expected", async () => {
    const { asFragment } = renderWithContext(<Outcome />, "decimal");
    expect(asFragment()).toMatchSnapshot();
  });

  test("falls back to decimal if bad data", async () => {
    const { asFragment } = renderWithContext(<Outcome />, "xyz");
    expect(asFragment()).toMatchSnapshot();
  });
});
