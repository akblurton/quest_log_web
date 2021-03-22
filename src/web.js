import ReactDOM from "react-dom";
import React from "react";
import Root from "./components/Root";
import { loadableReady } from "@loadable/component";

loadableReady(() => {
  const main = document.querySelector("#main");
  ReactDOM.hydrate(<Root />, main);
});
