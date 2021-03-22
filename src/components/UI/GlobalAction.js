import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Plus } from "react-feather";

const ICON_MAP = {
  add: Plus,
};

const Button = styled.button`
  position: fixed;
  z-index: 200;
  bottom: 16px;
  right: 16px;
  height: 64px;
  width: 64px;
  background: var(--color-primary);
  color: var(--color-foreground);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border: 0;
  padding: 10px;
  cursor: pointer;
  outline: 0;
  transition: transform 0.2s ease-in-out;

  svg {
    width: 44px;
    height: 44px;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const GlobalAction = ({ icon, ...props }) => {
  const Icon = ICON_MAP[icon] || ICON_MAP.default;
  return (
    <Button {...props}>
      <Icon />
    </Button>
  );
};

GlobalAction.propTypes = {
  icon: PropTypes.oneOf(Array.from(Object.keys(ICON_MAP))),
};

export default GlobalAction;
