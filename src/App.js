import "./App.css";
import React, { useState } from "react";
import LoginForm from "./Components/login-form";
import { AdminStart } from "./Views/Admin/admin-start";

function App() {
  const adminUser = {
    username: "Admin",
    password: "admin123",
  };

  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const Login = (details) => {
    if (
      details.username === adminUser.username &&
      details.password === adminUser.password
    ) {
      setUser({
        username: details.username,
      });
      setIsAdmin(true);
    } else {
      setError("Wrong Username or Password, Please try again");
    }
  };

  const Logout = () => {
    setUser({ name: "" });
    setIsAdmin(false);
    setError("");
  };

  return (
    <main className="App">
      {isAdmin ? (
        <AdminStart Logout={Logout} />
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </main>
  );
}

export default App;
