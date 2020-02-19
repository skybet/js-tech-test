import React from "react";
import Market from "../components/Market";
import OddsToggle from "../components/OddsToggle";
import { useLiveEvents } from "../hooks/";
import { Link } from "react-router-dom";

const Live = () => {
  const events = useLiveEvents();

  return events.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <OddsToggle />
      {events.map(({ eventId, markets, competitors, scores }) => (
        <div key={eventId} className="c-event">
          <div key={eventId} className="c-event__name">
            <div className="c-event__competitors">
              {competitors[0].name}
              <br />
              {competitors[1].name}
              <br />
              <Link className="c-event__full-market" to={`/event/${eventId}`}>
                View Full Market
              </Link>
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
