import React from "react";
import PropTypes from "prop-types";

class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    if (error.name === "ChunkLoadError") {
      return { hasError: true };
    }

    return {};
  }

  componentDidCatch(_error, _errorInfo) {}

  render() {
    if (this.state.hasError) {
      return <div>Could not load page</div>;
    }

    return this.props.children;
  }
}

PageErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default PageErrorBoundary;
