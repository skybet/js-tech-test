import { useEffect, useState } from "react";

const useEvent = id => {
  const [event, setEvent] = useState();

  useEffect(() => {
    fetch(`http://localhost:8888/sportsbook/event/${id}`)
      .then(response => response.json())
      .then(json => {
        setEvent(json.event);
      });
  }, [id]);

  return event;
};

export default useEvent;
