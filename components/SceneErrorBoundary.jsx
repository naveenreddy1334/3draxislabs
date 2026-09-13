"use client";

import { Component } from "react";

export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keep this quiet in production, but surface it in dev so it's easy to debug.
    if (process.env.NODE_ENV !== "production") {
      console.error("3D scene failed to render:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
