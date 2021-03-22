import styled from "styled-components";
import { Link } from "react-router-dom";

export default styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
