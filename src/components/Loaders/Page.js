import styled from "styled-components";
import after from "../../hoc/after";
import controllerAnimation from "#/img/loaders/controllers.svg";
const PageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &::after {
    content: "";
    background: url("${controllerAnimation}") var(--color-secondary) bottom  repeat;
    display: block;
    width: 24vmin;
    height: 24vmin;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8) inset;
    border-radius: 50%;
  }
`;

export default after(300)(PageLoader);
