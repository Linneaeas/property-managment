export function StartPage() {
  return (
    <div className="StartPageWrap">
      <header className="Header" id="StartHeader">
        <h1>CHOOSE USER</h1>
      </header>
      <nav className="StartPage">
        <button className="StartPageBTN"> ADMIN </button>
        <button className="StartPageBTN"> FRONT DESK </button>
        <button className="StartPageBTN"> HOUSEKEEPING </button>
        <button className="StartPageBTN"> MAINTAINENCE </button>
      </nav>
    </div>
  );
}
