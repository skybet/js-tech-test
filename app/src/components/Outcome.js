import React from "react";
import useOutcome from "../hooks/useOutcome";

const Outcome = ({ id }) => {
  const outcome = useOutcome(id);

  if (!outcome) return <div>Loading...</div>;

  const {
    name,
    price: { num, den }
  } = outcome;

  return (
    <div>
      {name} {num}/{den}
    </div>
  );
};

export default Outcome;
