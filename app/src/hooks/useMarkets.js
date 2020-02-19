import { useContext, useEffect } from "react";
import { SocketContext } from "../App";

const useMarkets = event => {
  const [socket] = useContext(SocketContext);

  useEffect(() => {
    if (!event) return;
    event.markets.forEach(id =>
      socket.send(JSON.stringify({ type: "getMarket", id }))
    );
  }, [event, socket]);
};

export default useMarkets;
