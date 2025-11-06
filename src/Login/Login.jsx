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
    <div className="container-fluid main-container">
   

      <div className="row align-items-center justify-content-center w-100">
      
        <div className="col-lg-5 col-md-7 col-sm-10 col-12 form-container">
          <div className="form-wrapper">
            <h1>Sign In</h1>
            <p>
              New user?{" "}
              <a href="#" className="text-decoration-none text-primary">
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

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="keepSignedIn"
                />
                <label
                  className="form-check-label"
                  htmlFor="keepSignedIn"
                >
                  Keep me signed in
                </label>
              </div>

              {error && <p className="text-danger small">{error}</p>}

              <div className="d-grid">
                <button type="submit" className="btn btn-dark-custom text-white">
                  Sign In
                </button>
              </div>
            </form>

            <div className="separator">Or Sign In With</div>

            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="social-btn"><i className="fab fa-google"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>

        
        <div className="col-lg-5 col-md-5 image-container">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="walking-person-img img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
