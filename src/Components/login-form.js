import React, { useState } from "react";

export default function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ username: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="Header">
          <h1>LOGIN</h1>
        </div>
        <div className="Form">
          {error != "" ? <div className="error">{error}</div> : ""}
          <div className="FormGroup">
            <label htmlFor="username" id="LoginLabel">
              Username:{" "}
            </label>
            <input
              type="text"
              name="name"
              id="LoginInput"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
          </div>

          <div className="FormGroup">
            <label htmlFor="password" id="LoginLabel">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="LoginInput"
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
    </>
  );
}
