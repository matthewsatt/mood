import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { FormErrors } from "../ui";
import AuthLayout from "./AuthLayout";

const validate = ({ username, email, password, repeatPassword }) => {
  const errors = [];
  if (username.trim().length < 5) errors.push("Username must be at least 5 characters.");
  if (username.trim().length > 30) errors.push("Username must be 30 characters or fewer.");
  if (!/^[^@\s]+@[^@\s]+$/.test(email.trim())) errors.push("Enter a valid email address.");
  if (password.length < 5) errors.push("Password must be at least 5 characters.");
  if (repeatPassword !== password) errors.push("Passwords don't match.");
  return errors;
};

const SignUpForm = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "", repeatPassword: "" });
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const update = (field) => (e) => setValues({ ...values, [field]: e.target.value });

  const onSignUp = async (e) => {
    e.preventDefault();
    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (clientErrors.length) return;

    setBusy(true);
    const data = await dispatch(signUp(values.username.trim(), values.email.trim(), values.password));
    if (data) {
      setErrors(data);
      setBusy(false);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="We'll start you off with three moods and a few songs."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form onSubmit={onSignUp} className="form" noValidate>
        <FormErrors errors={errors} />
        <label className="field">
          <span className="field__label">Username</span>
          <input
            className="input"
            name="username"
            autoComplete="username"
            value={values.username}
            onChange={update("username")}
            autoFocus
          />
        </label>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            className="input"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={update("email")}
          />
        </label>
        <label className="field">
          <span className="field__label">Password</span>
          <input
            className="input"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={update("password")}
          />
          <span className="field__hint">At least 5 characters.</span>
        </label>
        <label className="field">
          <span className="field__label">Confirm password</span>
          <input
            className="input"
            name="repeat_password"
            type="password"
            autoComplete="new-password"
            value={values.repeatPassword}
            onChange={update("repeatPassword")}
          />
        </label>
        <button className="btn btn--primary btn--lg btn--block" type="submit" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUpForm;
