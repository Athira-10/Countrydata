import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../images/imagekey.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@$!%*?&#^()]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long with 1 uppercase, 1 number, and 1 symbol."
      );
      return;
    }

    setError("");
    navigate("/homepage");
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card d-flex shadow">
        {/* LEFT: FORM SECTION */}
        <div className="login-form px-5 py-4">
          <h2 className="fw-bold mb-2">Sign In</h2>
          <p className="text-muted mb-4">
            New user?{" "}
            <a href="#" className="text-primary text-decoration-none">
              Create an account
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="keepSignedIn"
                />
                <label
                  className="form-check-label small text-muted"
                  htmlFor="keepSignedIn"
                >
                  Keep me signed in
                </label>
              </div>
            </div>

            {error && <p className="text-danger small">{error}</p>}

            <button type="submit" className="btn btn-dark w-100 mb-3">
              Sign In
            </button>
          </form>

          <div className="divider my-4 d-flex align-items-center">
            <div className="flex-grow-1 border-top"></div>
            <p className="mx-2 mb-0 small text-muted">Or Sign In With</p>
            <div className="flex-grow-1 border-top"></div>
          </div>

          <div className="social-icons text-center">
            <div className="icon-circle">
              <i className="fab fa-google"></i>
            </div>
            <div className="icon-circle">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="icon-circle">
              <i className="fab fa-linkedin-in"></i>
            </div>
            <div className="icon-circle">
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>

        {/* RIGHT: IMAGE SECTION */}
        <div className="login-illustration d-flex align-items-center justify-content-center bg-light">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="img-fluid illustration-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
