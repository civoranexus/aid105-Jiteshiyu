import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__brand">
          <h3 className="footer__title">SchemeAssist AI</h3>
          <p className="footer__description">
            An independent, AI-assisted platform designed to help citizens
            understand and discover government welfare schemes based on
            eligibility criteria.
          </p>
        </div>

        <div className="footer__links">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schemes">Schemes</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer__legal">
          <h4>Information</h4>
          <ul>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} SchemeAssist AI.  
          This platform is not affiliated with any government authority.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
