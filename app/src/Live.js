import React from "react";
import Market from "./components/Market";
import useLiveEvents from "./hooks/useLiveEvents";

const Live = () => {
  const events = useLiveEvents();

  return events.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
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
