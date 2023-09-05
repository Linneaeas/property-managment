import { ROUTE_ADMIN, ROUTE_START } from "./Utils/constants";

export function StartPage() {
  return (
    <div className="StartPageWrap">
      <header className="StartPageHeader">
        <h1>CHOOSE USER</h1>
      </header>
      <div className="StartPage">
        <button
          className="StartPageBTN"
          onClick={() => setRoute({ route: ROUTE_ADMIN, data: {} })}
        >
          {" "}
          ADMIN{" "}
        </button>
        <button className="StartPageBTN"> FRONT DESK </button>
        <button className="StartPageBTN"> HOUSEKEEPING </button>
        <button className="StartPageBTN"> MAINTAINENCE </button>
      </div>
    </div>
  );
}
