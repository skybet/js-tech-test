import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [events, updateEvents] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8889");

    socket.addEventListener("open", event =>
      socket.send(
        JSON.stringify({ type: "getLiveEvents", primaryMarkets: false })
      )
    );

    socket.addEventListener("message", event => {
      const response = JSON.parse(event.data);

      // Potentially we can do more checks here to validate the data.
      if (Array.isArray(response.data)) {
        updateEvents(JSON.parse(event.data).data);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">Stars Tech Test</header>
      <ul>
        {events.map(({ eventId, name }) => (
          <li key={eventId}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
