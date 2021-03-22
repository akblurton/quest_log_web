// Adapted from https://github.com/joshwcomeau/dark-mode-minimal/blob/e08c874accdbfc2237054cf059571c8c87d25a83/src/components/ThemeContext.js

import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { THEME, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from "./theme";
const ThemeContext = React.createContext();
const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined);
  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    );

    rawSetColorMode(initialColorValue);
  }, []);

  const contextValue = useMemo(() => {
    function setColorMode(newValue) {
      const root = window.document.documentElement;
      localStorage.setItem(COLOR_MODE_KEY, newValue);

      for (const [type, variables] of Object.entries(THEME)) {
        for (const [name, valueByTheme] of Object.entries(variables)) {
          const cssVarName = `--${type}-${name}`;
          root.style.setProperty(cssVarName, valueByTheme[newValue]);
        }
      }
      rawSetColorMode(newValue);
    }

    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export { ThemeContext, ThemeProvider };
