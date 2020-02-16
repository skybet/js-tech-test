import { useEffect, useState } from "react";
import { SOCKET_URL } from "../config";

const socket = new WebSocket(SOCKET_URL);

const useOutcome = id => {
  const [outcome, setOutcome] = useState();

  useEffect(() => {
    if (!id) return;

    socket.send(
      JSON.stringify({
        type: "getOutcome",
        id
      })
    );

    socket.addEventListener("message", event => {
      const response = JSON.parse(event.data);

      if (response.type === "OUTCOME_DATA" && response.data.outcomeId === id) {
        setOutcome(response.data);
      }
    });

    return socket.close;
  }, [id]);

  return outcome;
};

export default useOutcome;
