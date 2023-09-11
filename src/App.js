import "./App.css";
import React, { useState } from "react";
import LoginForm from "./Components/LoginForm";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Details don't match");
      setError("Details don't match");
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
  };

  return (
    <main className="App">
      {user.email != "" ? (
        <div classname="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </main>
  );
}

export default App;
