import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import FormGroup from "../components/FormGroup";
import BrandLogo from "../../shared/components/BrandLogo";
import { Lightning, SignIn, WarningCircle } from "@phosphor-icons/react";
import "../style/auth.scss";

const Login = () => {
  const { handleLogin, loading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setSubmitting(true);
    const result = await handleLogin({
      email: emailOrUser,
      username: emailOrUser,
      password,
    });
    setSubmitting(false);
    if (result.success) {
      navigate("/");
    }
  }

  async function handleDemoLogin() {
    setEmailOrUser("demo@moodify.io");
    setPassword("moodify123");
    setSubmitting(true);
    const result = await handleLogin({
      email: "demo@moodify.io",
      username: "demo@moodify.io",
      password: "moodify123",
    });
    setSubmitting(false);
    if (result.success) {
      navigate("/");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <BrandLogo size="lg" />
          <h1>Sign in to Moodify</h1>
          <p>Emotion-driven acoustic soundscapes tuned to your face</p>
        </header>

        {/* 1-Click Quick Demo Login for Portfolio Reviewers */}
        <div className="auth-demo-banner">
          <div className="auth-demo-info">
            <span>Portfolio Demo Mode</span>
            <strong>demo@moodify.io (1-Click)</strong>
          </div>
          <button
            type="button"
            className="btn btn--secondary btn--sm btn--pill"
            onClick={handleDemoLogin}
            disabled={submitting || loading}
          >
            <Lightning size={14} weight="fill" color="#f59e0b" />
            Quick Demo
          </button>
        </div>

        {authError && (
          <div className="auth-error" role="alert">
            <WarningCircle size={18} weight="bold" />
            <span>{authError}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormGroup
            label="Email or Username"
            type="text"
            value={emailOrUser}
            onChange={(e) => {
              setEmailOrUser(e.target.value);
              if (authError) setAuthError(null);
            }}
            placeholder="demo@moodify.io"
            required
            autoComplete="username"
          />

          <FormGroup
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (authError) setAuthError(null);
            }}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="btn btn--primary btn--lg"
            disabled={submitting || loading}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            <SignIn size={18} weight="bold" />
            {submitting ? "Signing in..." : "Enter Soundscape"}
          </button>
        </form>

        <footer className="auth-footer">
          Don't have an account?
          <Link to="/register">Create an account</Link>
        </footer>
      </div>
    </main>
  );
};

export default Login;
