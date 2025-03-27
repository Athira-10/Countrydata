import React from "react";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons text-center">
      <div className="icon-circle"><i className="fab fa-facebook-f"></i></div>
      
      <div className="icon-circle"><i className="fab fa-twitter"></i></div>

      <div className="icon-circle"><i className="fab fa-linkedin"></i></div>
      <div className="icon-circle"><i className="fab fa-youtube"></i></div>

      </div>
      <p>Example@email.com</p>
      <p>Copyright © 2020 Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
