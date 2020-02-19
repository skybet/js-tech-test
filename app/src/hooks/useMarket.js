import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import { useStore } from "./";

const useMarket = id => {
  const [socket] = useContext(SocketContext);
  const market = useStore("markets", id);

  useEffect(() => {
    if (!market) {
      socket.send(JSON.stringify({ type: "getMarket", id }));
    }
  }, [id, socket, market]);

  return market;
};

export default useMarket;
