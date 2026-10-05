import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const FormGroup = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="form-group">
      <div className="form-group__header">
        <label className="form-group__label">{label}</label>
      </div>
      <div className="form-group__input-wrapper">
        <input
          className={`form-group__input ${error ? "form-group__input--error" : ""}`}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
        {isPassword && (
          <button
            type="button"
            className="form-group__toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
          </button>
        )}
      </div>
      {error && <span className="form-group__error">{error}</span>}
    </div>
  );
};

export default FormGroup;
