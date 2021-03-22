import React from "react";
import PropTypes from "prop-types";
import { SkeletonTheme } from "react-loading-skeleton";
// import * as theme from "./theme";

const MySkeletonTheme = ({ children }) => {
  // const currentTheme = useContext(ThemeContext);
  // const props = { theme: currentTheme };
  return (
    <SkeletonTheme
    // color={theme.skeleton(props)}
    // highlightColor={theme.skeletonHighlight(props)}
    >
      {children}
    </SkeletonTheme>
  );
};
MySkeletonTheme.propTypes = {
  children: PropTypes.node,
};

export default MySkeletonTheme;
