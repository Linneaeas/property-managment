import LogoutButton from "../../Components/logout-button";
export function AdminStart({ Logout }) {
  return (
    <div>
      {Logout && <LogoutButton Logout={Logout} />}
      <div className="Header">
        <h1>ADMIN</h1>
      </div>
      <h2>Hello, you are on the Admin startpage!</h2>
      <p>
        To do:
        <br />
        Add Navigation menu
        <br />
        Property navigation (side bar)
        <br />
      </p>
    </div>
  );
}
