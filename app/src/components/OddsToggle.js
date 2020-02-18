import React, { useContext } from "react";
import { OddsContext } from "../App";

const OddsToggle = () => {
  const [oddsType, toggleOdds] = useContext(OddsContext);

  return (
    <button className="c-button" onClick={toggleOdds}>
      Odds: {oddsType}
    </button>
  );
};

export default OddsToggle;
