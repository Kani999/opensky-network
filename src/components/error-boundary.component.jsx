import React, { Component } from 'react'
import './error-boundary.style.css'


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // log the error to console
        console.log(error + ' ' + errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="error"><p>Something went wrong.</p></div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary
