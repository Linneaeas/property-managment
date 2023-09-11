import "./App.css";
import React, { useState } from "react";
import LoginForm from "./Components/login-form";
import { AdminStart } from "./Views/Admin/admin-start";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const Login = (details) => {
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      setUser({
        name: details.name,
        email: details.email,
      });
      setIsAdmin(true);
    } else {
      setError("Details don't match");
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
    setIsAdmin(false);
  };

  return (
    <main className="App">
      {isAdmin ? <AdminStart /> : <LoginForm Login={Login} error={error} />}
    </main>
  );
}

export default App;
