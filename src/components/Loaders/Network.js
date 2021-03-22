import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import controllerAnimation from "#/img/loaders/controllers.svg";
import useAnimationFrame from "~/hooks/animationFrame";

const CIRC = 283;
const MAX = CIRC * 0.75,
  OFF_DURATION = 240;
const LoadingBG = styled.div`
  background: url("${controllerAnimation}") var(--color-secondary) center / 100%
    repeat;
  display: block;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) inset;
  border-radius: 50%;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Root = styled.div.withConfig({
  shouldForwardProp: (prop) => prop === "children",
})`
  display: block;
  position: fixed;
  top: 0;
  left: 50%;
  width: 10vmin;
  height: 10vmin;
  min-width: 100px;
  min-height: 100px;
  transform: translate(-50%, -35%) ${({ on }) => (on ? "scale(1)" : "scale(0)")};
  transition: transform ease-in-out;
  transform-origin: top center;
  transition-duration: ${({ on }) => (on ? "0.5s" : "0.3s")};
  transition-delay: ${({ on }) => (on ? "0" : OFF_DURATION)}ms;
`;

const Circle = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  stroke: var(--color-primary);
  stroke-linecap: butt;
  stroke-dasharray: 1 282;
  stroke-width: 10px;
  transform-origin: 50% 50%;
  fill: none;
  width: 100%;
  height: 100%;
  transform: rotate(-40deg);

  circle {
    width: 100%;
    height: 100%;
  }
`;

const NetworkLoader = ({ on, ...props }) => {
  const [progress, setProgress] = useState(MAX);
  const elapsed = useRef(0),
    location = useRef(null);
  useEffect(() => {
    if (on) {
      setProgress(MAX);
    } else {
      elapsed.current = 0;
    }
  }, [on]);
  useAnimationFrame((dt) => {
    if (on) {
      const seconds = 1 / dt;
      let change = Math.floor(progress / 9);
      setProgress(
        (p) => (location.current = Math.max(2, p - change * seconds))
      );
    } else {
      elapsed.current = Math.min(OFF_DURATION, elapsed.current + dt);
      const change = (location.current * elapsed.current) / OFF_DURATION;
      setProgress(Math.round(location.current - change));
    }
  });
  return (
    <Root on={on} {...props}>
      <Circle
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        data-testid="svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${MAX - progress} ${progress} 0 ${CIRC - MAX}`}
        />
      </Circle>
      <LoadingBG />
    </Root>
  );
};

NetworkLoader.propTypes = {
  on: PropTypes.bool,
};

NetworkLoader.defaultProps = {
  on: false,
};

export default NetworkLoader;
