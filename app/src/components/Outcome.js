import React, { useContext } from "react";
import useOutcome from "../hooks/useOutcome";
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
    <div>
      {name} {oddsType === "fractional" ? `${num}/${den}` : decimal}
    </div>
  );
};

export default Outcome;
