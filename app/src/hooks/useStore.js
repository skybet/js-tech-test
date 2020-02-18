import { useContext } from "react";
import { StoreContext } from "../App";

const useStore = (key, id) => {
  const store = useContext(StoreContext);

  if (key === "market" || key === "outcome") {
    return store[key][id];
  }

  return store[key];
};

export default useStore;
