import { Fragment, useEffect, useState } from "react";
import { Provider } from "react-redux";
import {persistor, store} from "../redux/store";
import DummyComponent from "./dummy";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [lateLoad, setlateLoad] = useState(false);

  useEffect(() => {
    setlateLoad(true);
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
        <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
          <DummyComponent /> {/* Render DummyComponent */}
        </div></PersistGate>
      </Provider>
    </Fragment>
  );
}

export default App;
