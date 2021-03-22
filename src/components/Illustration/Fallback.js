import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { background, tertiary } from "~/style/theme";

const Styled = styled.div`
  background: ${tertiary};
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${background};
`;

const Fallback = ({ className }) => (
  <Styled className={className}>Loading Image</Styled>
);

Fallback.propTypes = {
  className: PropTypes.string,
};

export default Fallback;
