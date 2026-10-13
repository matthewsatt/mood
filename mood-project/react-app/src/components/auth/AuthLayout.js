import React from "react";
import { Wordmark } from "../ui";
import "./Auth.css";

// One octave and a bit: true where a white key has a black key after it
const KEYS = [true, true, false, true, true, true, false, true, true, false];

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <main className="auth">
      <div className="auth__keys" aria-hidden="true">
        {KEYS.map((sharp, i) => (
          <div key={i} className={`auth__key ${sharp ? "auth__key--sharp" : ""}`} />
        ))}
      </div>

      <div className="auth__card">
        <Wordmark className="auth__logo" />
        <h1 className="auth__title">{title}</h1>
        <p className="auth__subtitle">{subtitle}</p>
        {children}
        <p className="auth__footer">{footer}</p>
      </div>
    </main>
  );
}
