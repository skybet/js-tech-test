import React from "react";
import Outcome from "./Outcome";
import useMarket from "../hooks/useMarket";

const Market = ({ id }) => {
  const { marketId, name, outcomes } = useMarket(id);

  return marketId ? (
    <div className="c-market">
      <h3>{name}</h3>
      <div>
        {outcomes &&
          outcomes.map(outcome => <Outcome key={outcome} id={outcome} />)}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Market;
