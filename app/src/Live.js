import React, { useContext } from "react";
import Market from "./components/Market";
import useLiveEvents from "./hooks/useLiveEvents";
import { OddsContext } from "./App";

const Live = () => {
  const [oddsType, toggleOdds] = useContext(OddsContext);
  const events = useLiveEvents();

  return events.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <button onClick={toggleOdds}>Odds: {oddsType}</button>
      {events.map(({ eventId, name, markets }) => (
        <div key={eventId} className="c-event">
          <h2 key={eventId}>{name}</h2>
          <Market id={markets[0]} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default Live;
