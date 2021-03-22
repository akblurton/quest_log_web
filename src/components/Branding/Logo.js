import styled from "styled-components";

const Logo = styled.h1`
  overflow: hidden;
  width: 300px;
  height: 100px;
  text-indent: -9999px;
  background: no-repeat center left / contain;
  /* stylelint-disable */
  background-image: var(--image-logo);
  /* stylelint-enable */
`;

export default Logo;
