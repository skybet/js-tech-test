import React from "react";
import Outcome from "./Outcome";
import { useMarket } from "../hooks/";

const Market = ({ id }) => {
  const market = useMarket(id);

  if (!market) {
    return <div>Loading...</div>;
  }

  const { name, outcomes } = market;

  return (
    <div className="c-market">
      <div className="c-market__title">{name}</div>
      <div>
        {outcomes &&
          outcomes.map(outcome => <Outcome key={outcome} id={outcome} />)}
      </div>
    </div>
  );
};

export default Market;
