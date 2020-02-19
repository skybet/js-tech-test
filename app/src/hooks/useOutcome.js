import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import { useStore } from "./";

const useOutcome = id => {
  const outcome = useStore("outcomes", id);
  const [socket] = useContext(SocketContext);

  useEffect(() => {
    if (!id) return;
    socket.send(JSON.stringify({ type: "getOutcome", id }));
  }, [id, socket]);

  return outcome;
};

export default useOutcome;
