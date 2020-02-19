import React from "react";
import Market from "../components/Market";
import { useParams, Link } from "react-router-dom";
import formatStartTime from "../helpers/startTime";
import OddsToggle from "../components/OddsToggle";
import { useDebounce, useEvent, useStore, useMarkets } from "../hooks/";

const INITIAL_MARKETS = 10;

const Event = () => {
  const { eventId } = useParams();
  const event = useEvent(eventId);

  useMarkets(event);

  const allMarkets = useDebounce(useStore("markets"), 10);

  const orderedMarkets = React.useMemo(
    () =>
      Object.values(allMarkets)
        .sort((a, b) => a.displayOrder > b.displayOrder)
        .map(({ marketId }) => marketId)
        .slice(0, INITIAL_MARKETS),
    [allMarkets]
  );

  if (!event) {
    return <div>Loading...</div>;
  }

  const { startTime } = event;

  return (
    <div className="c-full-event">
      <Link className="c-full-event__back" to="/">
        {"< Back"}
      </Link>
      <OddsToggle />

      <div className="c-full-event__name">{event.name}</div>
      <div className="c-full-event">{formatStartTime(startTime)}</div>
      <div className="c-full-event__meta">
        <div className="c-full-event__meta-item">
          {event.className} > {event.typeName}
        </div>
        <div className="c-full-event__meta-item">
          {event.linkedEventTypeName}
        </div>

        {event.status.live && (
          <div className="c-full-event__meta-item">Live</div>
        )}
        {event.status.suspended && (
          <div className="c-full-event__meta-item">Suspended</div>
        )}
        {event.status.cashoutable && (
          <div className="c-full-event__meta-item">Cashout available</div>
        )}
        {event.status.requestabet && (
          <div className="c-full-event__meta-item">Request a Bet</div>
        )}
      </div>
      {orderedMarkets.slice(0, INITIAL_MARKETS).map(id => (
        <Market key={id} id={id} />
      ))}
    </div>
  );
};

export default Event;
