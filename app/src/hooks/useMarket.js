import { useEffect, useState } from "react";
import { SOCKET_URL } from "../config";

const socket = new WebSocket(SOCKET_URL);

const useMarket = id => {
  const [market, setMarket] = useState([]);

  useEffect(() => {
    socket.send(
      JSON.stringify({
        type: "getMarket",
        id
      })
    );

    socket.addEventListener("message", event => {
      const response = JSON.parse(event.data);

      if (response.type === "MARKET_DATA" && response.data.marketId === id) {
        setMarket(response.data);
      }
    });

    return socket.close;
  }, [id]);

  return market;
};

export default useMarket;
