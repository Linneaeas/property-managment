import React from "react";

export default function LogoutButton({ Logout }) {
  return (
    <div>
      <button id="LogoutButton" onClick={Logout}>
        {" "}
        LOG OUT{" "}
      </button>
    </div>
  );
}
