import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import { useStore } from "./";

const useLiveEvents = () => {
  const [socket] = useContext(SocketContext);
  const events = useStore("events");

  useEffect(() => {
    socket.send(
      JSON.stringify({ type: "getLiveEvents", primaryMarkets: true })
    );
  }, [socket]);

  useEffect(() => {
    const eventsList = events.map(event => `e.${event.eventId}`);
    socket.send(
      JSON.stringify({
        type: "subscribe",
        keys: eventsList,
        clearSubscription: true
      })
    );

    return () =>
      socket.send(
        JSON.stringify({
          type: "unsubscribe",
          keys: eventsList
        })
      );
  }, [events, socket]);

  return events;
};

export default useLiveEvents;
