import React, { useState } from "react";

export default function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ username: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <div className="LoginView">
      <h1 className="StartPageHeader">LOGIN</h1>
      <form onSubmit={submitHandler}>
        <div className="LoginForm">
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="FormGroup">
            <label htmlFor="username" className="LoginLabel">
              Username:{" "}
            </label>
            <input
              type="text"
              name="name"
              id="usernameInput"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
          </div>

          <div className="FormGroup">
            <label htmlFor="password" className="LoginLabel">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="passwordInput"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <input className="LoginBTN" type="submit" value="LOGIN" />
        </div>
      </form>
      ;
    </div>
  );
}
