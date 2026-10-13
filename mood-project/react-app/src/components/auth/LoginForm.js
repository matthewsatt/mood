import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { FormErrors } from "../ui";
import AuthLayout from "./AuthLayout";

export const DEMO_USER = { email: "demo@aa.io", password: "password" };

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const submit = async (credentials) => {
    setBusy(true);
    const data = await dispatch(login(credentials.email, credentials.password));
    if (data) {
      setErrors(data);
      setBusy(false);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    submit({ email, password });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to get back to your moods."
      footer={
        <>
          New to mood? <Link to="/sign-up">Create an account</Link>
        </>
      }
    >
      <form onSubmit={onLogin} className="form" noValidate>
        <FormErrors errors={errors} />
        <label className="field">
          <span className="field__label">Email</span>
          <input
            className="input"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
        </label>
        <label className="field">
          <span className="field__label">Password</span>
          <input
            className="input"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="btn btn--primary btn--lg btn--block" type="submit" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </button>
        <div className="auth__divider">or</div>
        <button
          className="btn btn--secondary btn--lg btn--block"
          type="button"
          onClick={() => submit(DEMO_USER)}
          disabled={busy}
        >
          Continue as demo user
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
