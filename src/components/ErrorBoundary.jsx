import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong: {this.state.error}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
