import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import useStore from "./useStore";

const useMarket = id => {
  const [socket] = useContext(SocketContext);
  const market = useStore("markets", id);

  useEffect(() => {
    socket.send(JSON.stringify({ type: "getMarket", id }));
  }, [id, socket]);

  return market;
};

export default useMarket;
