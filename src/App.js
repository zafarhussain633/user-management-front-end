import { Provider } from "react-redux";
import { store } from "./store";
import ListUsers from "./features/ListUsers";

function App() {
  return (
    <Provider store={store}>
      <ListUsers />
    </Provider>
  );
}

export default App;
