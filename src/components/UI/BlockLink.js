import styled from "styled-components";
import { Link } from "react-router-dom";

export default styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;
