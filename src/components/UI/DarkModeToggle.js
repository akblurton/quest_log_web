// Adapted from https://github.com/joshwcomeau/dark-mode-minimal/blob/e08c874accdbfc2237054cf059571c8c87d25a83/src/components/DarkToggle.js
import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ThemeContext } from "~/style/ThemeProvider";

import { Sun, Moon } from "react-feather";

const Button = styled.button`
  width: 44px;
  height: 44px;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;

  svg {
    stroke: var(--color-foreground);
    width: 24px;
    height: 24px;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  right: 100%;
  top: 50%;
  background: var(--color-background);
  color: var(--color-foreground);
  white-space: nowrap;
  font-size: 13px;
  font-weight: bold;
  line-height: 24px;
  margin-top: -12px;
  height: 24px;
  pointer-events: none;
  opacity: 0;
  transform: translateX(20px);
  transition: 0.3s transform ease-in-out, 0.3s opacity ease-in-out;

  ${Button}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const DarkModeToggle = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);
  const onToggle = useCallback(() => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode]);

  if (!colorMode) {
    return null;
  }

  return (
    <Button onClick={onToggle}>
      {colorMode === "dark" ? <Moon /> : <Sun />}
      <Tooltip>Switch Color Scheme</Tooltip>
    </Button>
  );
};
DarkModeToggle.propTypes = {
  dark: PropTypes.bool,
  onChange: PropTypes.func,
};

export default DarkModeToggle;
