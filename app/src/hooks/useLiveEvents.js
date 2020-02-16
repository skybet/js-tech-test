import { useEffect, useState } from "react";
import { SOCKET_URL } from "../config";

const socket = new WebSocket(SOCKET_URL);

const useLiveEvents = () => {
  const [events, updateEvents] = useState([]);

  useEffect(() => {
    socket.addEventListener("open", () =>
      socket.send(
        JSON.stringify({ type: "getLiveEvents", primaryMarkets: true })
      )
    );

    socket.addEventListener("message", event => {
      const response = JSON.parse(event.data);

      if (response.type === "LIVE_EVENTS_DATA") {
        updateEvents(response.data);
      }
    });

    return socket.close;
  }, []);

  return events;
};

export default useLiveEvents;
