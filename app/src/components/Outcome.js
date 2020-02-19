import React, { useContext } from "react";
import { useOutcome } from "../hooks/";
import { OddsContext } from "../App";

const Outcome = ({ id }) => {
  const [oddsType] = useContext(OddsContext);
  const outcome = useOutcome(id);

  if (!outcome) return <div>Loading...</div>;

  const {
    name,
    price: { num, den, decimal }
  } = outcome;

  return (
    <div className="c-outcome">
      <span className="u-clr--blue u-mr--100">{name}</span>
      <span className="u-clr--red">
        {oddsType === "fractional"
          ? `${num}/${den}`
          : Number(decimal).toFixed(2)}
      </span>
    </div>
  );
};

export default Outcome;
