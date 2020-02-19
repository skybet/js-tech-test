// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { OddsContext } from "./App";

jest.mock("./hooks/useMarket", () =>
  jest.fn(() => ({
    marketId: 111,
    name: "Both teams to score",
    outcomes: [111, 222]
  }))
);

jest.mock("./hooks/useOutcome", () =>
  jest.fn(() => ({
    name: "Yes",
    price: {
      num: 3,
      den: 1,
      decimal: 4
    }
  }))
);

jest.mock("./hooks/useLiveEvents", () =>
  jest.fn(() => [
    {
      eventId: 111,
      name: "Everton vs West Ham",
      markets: [111, 222],
      competitors: [{ name: "Everton" }, { name: "West Ham" }],
      scores: { home: 3, away: 0 }
    }
  ])
);

export const renderWithContext = (component, oddsType = "fractional") =>
  render(
    <OddsContext.Provider value={[oddsType, jest.fn()]}>
      {component}
    </OddsContext.Provider>
  );
