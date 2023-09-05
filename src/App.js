import "./App.css";
import { StartPage } from "./start-page.js";
import { ROUTE_ADMIN, ROUTE_START } from "./Utils/constants";
import { AdminStartPage } from "./Admin/admin-start-page";

function App() {
  const [route, setRoute] = useState({ route: ROUTE_ADMIN, data: {} });
  let content;
        if (route.route === ROUTE_ADMIN) {
          content = <AdminStartPage setRoute={setRoute} />;
        } else if (route.route === ROUTE_START) {
          content = <StartPage />;
      
  return (
    <>
      <div className="App">
        <StartPage />
      </div>
    </>
  );
}

export default App;
