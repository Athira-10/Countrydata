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
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@$!%*?&#^()]{8,}$/;
    return regex.test(password);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Password entered:", password);
    console.log("Validation result:", validatePassword(password));

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long with 1 uppercase, 1 number, and 1 symbol.");
      return;
    }

    setError("");
    console.log("Password validated successfully! Navigating to homepage...");
    navigate("/homepage");
  };


  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card shadow p-4 d-flex">

        <div className="login-form-container">
          <h2 className="fw-bold">Sign In</h2>
          <p>
            New user? <a href="#">Create an account</a>
          </p>
          <div className="mt-4">
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
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="keepSignedIn" />
                <label className="form-check-label" htmlFor="keepSignedIn">
                  Keep me signed in
                </label>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-dark w-100">
                Sign In
              </button>
            </form>
          </div>

          <div className="or-sign-in">
            <div className="line"></div>
            <p className="text-center">Or Sign In With</p>
            <div className="line"></div>
          </div>

          <div className="social-icons text-center">
            <div className="icon-circle"><i className="fab fa-google"></i></div>
            <div className="icon-circle"><i className="fab fa-facebook"></i></div>
            <div className="icon-circle"><i className="fab fa-linkedin"></i></div>
            <div className="icon-circle"><i className="fab fa-twitter"></i></div>
          </div>

        </div>


        <div className="login-image-container ">
          <img src={loginIllustration} alt="Login Illustration" className="img-fluid" />

        </div>
      </div>
    </div>
  );
};

export default Login;
