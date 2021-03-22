import React, { Suspense } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { primary } from "~/style/theme";

import Fallback from "./Fallback";
import ErrorBoundary from "./ErrorBoundary";

const lazyLoaders = {};
const getLazyLoaded = (name) => {
  if (lazyLoaders[name]) {
    return lazyLoaders[name];
  }
  return (lazyLoaders[name] = React.lazy(() =>
    import(`static/illustrations/${name}.svg`).then((svg) => ({
      default: svg.ReactComponent,
    }))
  ));
};

/* eslint-disable-next-line no-unused-vars */
const Illustration = ({ name, className, width, height, ...props }) => {
  const Illustration = getLazyLoaded(name);
  return (
    <ErrorBoundary className={className}>
      <Suspense fallback={<Fallback className={className} />}>
        <Illustration {...props} className={className} />
      </Suspense>
    </ErrorBoundary>
  );
};

Illustration.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default styled(Illustration)`
  display: block;
  color: ${primary};
  ${({ height }) => (height ? `height: ${height}` : "")}
  ${({ width }) => (width ? `width: ${width}` : "")}
`;
