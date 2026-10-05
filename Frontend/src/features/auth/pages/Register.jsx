import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import FormGroup from "../components/FormGroup";
import BrandLogo from "../../shared/components/BrandLogo";
import { UserPlus, WarningCircle } from "@phosphor-icons/react";
import "../style/auth.scss";

const Register = () => {
  const { handleRegister, loading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    const result = await handleRegister({ username, email, password });
    setSubmitting(false);

    if (result.success) {
      navigate("/detect");
    }
  }

  const activeError = localError || authError;

  return (
    <main className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <BrandLogo size="lg" />
          <h1>Join MoodSync</h1>
          <p>Real-time facial expression music curation</p>
        </header>

        {activeError && (
          <div className="auth-error" role="alert">
            <WarningCircle size={18} weight="bold" />
            <span>{activeError}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (activeError) {
                setLocalError("");
                setAuthError(null);
              }
            }}
            placeholder="johndoe"
            required
            autoComplete="username"
          />

          <FormGroup
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (activeError) {
                setLocalError("");
                setAuthError(null);
              }
            }}
            placeholder="john@example.com"
            required
            autoComplete="email"
          />

          <FormGroup
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (activeError) {
                setLocalError("");
                setAuthError(null);
              }
            }}
            placeholder="Minimum 6 characters"
            required
            autoComplete="new-password"
          />

          <FormGroup
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (activeError) {
                setLocalError("");
                setAuthError(null);
              }
            }}
            placeholder="Repeat your password"
            required
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="btn btn--primary btn--lg"
            disabled={submitting || loading}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            <UserPlus size={18} weight="bold" />
            {submitting ? "Creating account..." : "Start Listening"}
          </button>
        </form>

        <footer className="auth-footer">
          Already have an account?
          <Link to="/login">Sign in here</Link>
        </footer>
      </div>
    </main>
  );
};

export default Register;
