import React from "react";
import Title from "../Typography/Title";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <>
      <Title>I&apos; Settings!</Title>
      <Link to="/">Home Time</Link>
      <button
        onClick={() => {
          throw new Error("I am fake");
        }}
      >
        KILL
      </button>
    </>
  );
};

export default Settings;
