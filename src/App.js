import "./App.css";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Home } from "./Views/home";
import { AdminStart } from "./Views/admin-start";
import { AdminProperty } from "./Views/admin-property";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Admin">AdminStart</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {" "}
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<AdminStart />} />
        <Route path="/Admin/:id" element={<AdminProperty />} />
      </Routes>
    </div>
  );
}

export default App;
