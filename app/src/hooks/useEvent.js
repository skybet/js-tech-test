import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import { useStore } from "./";

const useEvent = id => {
  const [socket] = useContext(SocketContext);
  const event = useStore("selectedEvent");

  useEffect(() => {
    socket.send(JSON.stringify({ type: "getEvent", id: Number(id) }));

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
