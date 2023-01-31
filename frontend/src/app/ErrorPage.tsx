import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";

export class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    return this.state.hasError ? (
      <div>
        <p>
          There was an error with this page. Please email us at
          nicholas@familylawassist.com.au for assistance.
        </p>
      </div>
    ) : (
      this.props.children
    );
  }
}
