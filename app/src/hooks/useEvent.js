import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../App";

const useEvent = id => {
  const [event, setEvent] = useState();
  const [socket] = useContext(SocketContext);

  useEffect(() => {
    fetch(`http://localhost:8888/sportsbook/event/${id}`)
      .then(response => response.json())
      .then(json => {
        setEvent(json.event);
      });

    socket.send(
      JSON.stringify({
        type: "subscribe",
        keys: [`e.${id}`],
        clearSubscription: false
      })
    );

    return () =>
      socket.send(
        JSON.stringify({
          type: "unsubscribe",
          keys: [`e.${id}`]
        })
      );
  }, [id, socket]);

  return event;
};

export default useEvent;
