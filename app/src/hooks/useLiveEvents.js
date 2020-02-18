import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import useStore from "./useStore";

const useLiveEvents = () => {
  const [socket] = useContext(SocketContext);
  const events = useStore("events");

  useEffect(() => {
    socket.send(
      JSON.stringify({ type: "getLiveEvents", primaryMarkets: true })
    );
  }, [socket]);

  return events;
};

export default useLiveEvents;
