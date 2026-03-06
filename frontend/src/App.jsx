import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="m-5 p-5">
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;
