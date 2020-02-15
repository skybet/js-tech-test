import React, { useEffect, useState } from "react";

const Live = () => {
  const [events, updateEvents] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8889");

    socket.addEventListener("open", () =>
      socket.send(
        JSON.stringify({ type: "getLiveEvents", primaryMarkets: false })
      )
    );

    socket.addEventListener("message", event => {
      const response = JSON.parse(event.data);

      // Potentially we can do more checks here to validate the data.
      if (Array.isArray(response.data)) {
        updateEvents(response.data);
      }
    });
  }, []);

  return (
    <ul>
      {events.map(({ eventId, name }) => (
        <li key={eventId}>{name}</li>
      ))}
    </ul>
  );
};

export default Live;
