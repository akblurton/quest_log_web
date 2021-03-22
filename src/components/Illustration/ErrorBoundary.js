import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Void } from "#/illustrations/void.svg";

class IllustrationError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(_error, _errorInfo) {}

  render() {
    if (this.state.hasError) {
      return <Void className={this.props.className} />;
    }

    return this.props.children;
  }
}

IllustrationError.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default IllustrationError;
