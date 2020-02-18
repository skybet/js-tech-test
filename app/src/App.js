import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Live from "./Scenes/Live";

export const OddsContext = React.createContext();

function App() {
  const reducer = state => (state === "fractional" ? "decimal" : "fractional");
  const [oddsType, toggleOdds] = useReducer(reducer, "fractional");

  return (
    <OddsContext.Provider value={[oddsType, toggleOdds]}>
      <div className="c-app">
        <header className="c-app__header">Stars Tech Test</header>
        <Router>
          <Switch>
            <Route path="/">
              <Live />
            </Route>
          </Switch>
        </Router>
      </div>
    </OddsContext.Provider>
  );
}

export default App;
