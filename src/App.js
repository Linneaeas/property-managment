import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AdminStart } from "./Views/admin-start";
import { AdminProperty } from "./Views/admin-property-properties";

function App() {
  return (
    <div className="App">
      <div className="StartPageWrap">
        <header className="Header" id="StartHeader">
          <h1>CHOOSE USER</h1>
        </header>
        <nav className="StartPage"></nav>
      </div>
    </div>
  );
}

export default App;
