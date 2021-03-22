import { all, call } from "redux-saga/effects";

/* global require */
const req = require.context("./features", true, /saga\.js$/);
const sagas = req.keys().map((mod) => req(mod).default);

export default function* () {
  yield all(sagas.map((fn) => call(fn)));
}
