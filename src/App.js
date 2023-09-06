import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AdminStart } from "./Views/admin-start";

function App() {
  return (
    <div className="App">
      <div className="StartPageWrap">
        <header className="Header" id="StartHeader">
          <h1>CHOOSE USER</h1>
        </header>
        <BrowserRouter>
          <nav className="StartPage">
            <Link to="/Admin">
              {" "}
              <button type="button" className="StartPageBTN">
                ADMIN
              </button>
            </Link>
          </nav>

          <Routes>
            <Route path="Admin" element={<AdminStart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
