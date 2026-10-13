import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page">
    <div className="container">
      <div className="empty-state">
        <p className="eyebrow">404</p>
        <h2>This page doesn't exist</h2>
        <p>The link may be broken, or the page may have moved.</p>
        <Link to="/" className="btn btn--primary">Go home</Link>
      </div>
    </div>
  </main>
);

export default NotFound;
