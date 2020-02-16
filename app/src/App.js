import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Live from "./Live";

export const OddsContext = React.createContext();

function App() {
  const reducer = state => (state === "fractional" ? "decimal" : "fractional");
  const [oddsType, toggle] = useReducer(reducer, "fractional");

  return (
    <OddsContext.Provider value={[oddsType, toggle]}>
      <div className="App">
        <header className="App-header">Stars Tech Test</header>
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
