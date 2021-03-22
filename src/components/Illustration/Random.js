import React, { useState } from "react";
import PropTypes from "prop-types";
import Illustration from "./index";

const RandomIllustration = ({ choices = [], ...props }) => {
  const [chosen] = useState(() => {
    const rand = Math.floor(Math.random() * choices.length);
    return choices[rand];
  });
  return <Illustration {...props} name={chosen} />;
};
RandomIllustration.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
};

export default RandomIllustration;
