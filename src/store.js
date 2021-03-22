import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import saga from "./saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  devTools: true,
  reducer: reducer,
  middleware: [sagaMiddleware, ...getDefaultMiddleware()],
});

let task;
function _runSaga() {
  if (task) {
    task.cancel();
  }

  task = sagaMiddleware.run(saga);
}
_runSaga();

/* global module */
if (module.hot) {
  module.hot.accept("./reducer", () => store.replaceReducer(reducer));
  module.hot.accept("./saga", _runSaga);
}

export default store;
