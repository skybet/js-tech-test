import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Live from "./Live";

function App() {
  return (
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
  );
}

export default App;
