import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Event, Live } from "./Scenes/";
import { SOCKET_URL } from "./config";

export const OddsContext = React.createContext();
export const SocketContext = React.createContext();
export const StoreContext = React.createContext();

function App() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState();
  const oddsReducer = state =>
    state === "fractional" ? "decimal" : "fractional";
  const [oddsType, toggleOdds] = useReducer(oddsReducer, "fractional");

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  const marketReducer = (state, market) => ({
    ...state,
    [market.marketId]: market
  });
  const [markets, updateMarket] = useReducer(marketReducer, {});

  const outcomeReducer = (state, outcome) => ({
    ...state,
    [outcome.outcomeId]: {
      ...state[outcome.outcomeId],
      ...outcome
    }
  });
  const [outcomes, updateOutcome] = useReducer(outcomeReducer, {});

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(SOCKET_URL);
      newSocket.addEventListener("open", () => {
        setSocket(newSocket);
        setConnected(true);
      });

      newSocket.addEventListener("message", event => {
        const { type, data } = JSON.parse(event.data);

        switch (type) {
          case "MARKET_DATA":
            updateMarket(data);
            break;
          case "LIVE_EVENTS_DATA":
            setEvents(data);
            break;
          case "EVENT_DATA":
            setSelectedEvent(data);
            break;
          case "OUTCOME_DATA":
            updateOutcome(data);
            break;
          case "CURRENT_SUBSCRIPTIONS":
            break;
          case "PRICE_CHANGE":
            updateOutcome(data);
            break;
          default:
            console.log(type);
            break;
        }
      });
    }
  }, [socket]);

  if (!connected) {
    return <div>Connecting...</div>;
  }

  return (
    <StoreContext.Provider
      value={{
        events,
        markets,
        outcomes,
        selectedEvent
      }}
    >
      <SocketContext.Provider
        value={[socket, connected, setSocket, setConnected]}
      >
        <OddsContext.Provider value={[oddsType, toggleOdds]}>
          <div className="c-app">
            <header className="c-app__header">Stars Tech Test</header>
            <Router>
              <Switch>
                <Route path="/event/:eventId" component={Event} />
                <Route path="/" component={Live} />
              </Switch>
            </Router>
          </div>
        </OddsContext.Provider>
      </SocketContext.Provider>
    </StoreContext.Provider>
  );
}

export default App;
