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
      <button className="c-button" onClick={toggleOdds}>
        Odds: {oddsType}
      </button>
      {events.map(({ eventId, markets, competitors, scores }) => (
        <div key={eventId} className="c-event">
          <div key={eventId} className="c-event__name">
            <div className="c-event__competitors">
              {competitors[0].name}
              <br />
              {competitors[1].name}
            </div>
            <div className="c-event__score">
              {scores.home}
              <br />
              {scores.away}
            </div>
          </div>
          <Market id={markets[0]} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default Live;
