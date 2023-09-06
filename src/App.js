import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { StartPage } from "./Views/start-page.js";
import { AdminStart } from "./Views/admin-start";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Admin"> Admin</Link>
        </nav>

        <Routes>
          <Route index element={<StartPage />} />
          <Route path="Admin" element={<AdminStart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
