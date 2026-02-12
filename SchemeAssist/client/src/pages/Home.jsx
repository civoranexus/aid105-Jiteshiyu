import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home">

      <section className="home__hero">
        <h1 className="home__title">SchemeAssist AI</h1>
        <p className="home__subtitle">
          A structured, AI-assisted platform that helps citizens identify
          government welfare schemes they are eligible for — clearly,
          transparently, and efficiently.
        </p>

        <div className="home__actions">
          <Link to="/schemes" className="btn btn--primary">
            Explore Schemes
          </Link>
          <Link to="/about" className="btn btn--secondary">
            Learn How It Works
          </Link>
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__heading">The Problem</h2>
        <p className="home__text">
          Despite the availability of numerous government welfare schemes,
          a large number of eligible citizens fail to benefit from them.
          This is not due to lack of intent, but due to systemic barriers.
        </p>

        <ul className="home__list">
          <li>Low awareness of applicable schemes</li>
          <li>Complex and poorly explained eligibility criteria</li>
          <li>Information scattered across multiple portals</li>
          <li>Unclear documentation requirements</li>
        </ul>
      </section>

      <section className="home__section home__section--alt">
        <h2 className="home__heading">Our Approach</h2>
        <p className="home__text">
          SchemeAssist AI focuses on eligibility clarity first.
          Instead of listing schemes blindly, the platform uses
          structured logic and AI-assisted explanations to narrow
          down schemes relevant to the user.
        </p>

        <div className="home__features">
          <div className="feature">
            <h3>Eligibility-Driven</h3>
            <p>
              Schemes are matched based on income range, occupation,
              category, location, and other criteria.
            </p>
          </div>

          <div className="feature">
            <h3>Explainable Results</h3>
            <p>
              Users are informed why a scheme applies or does not apply
              to them — reducing confusion and false expectations.
            </p>
          </div>

          <div className="feature">
            <h3>Centralized Discovery</h3>
            <p>
              Information is presented in a single, consistent interface
              instead of fragmented government portals.
            </p>
          </div>
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__heading">Important Note</h2>
        <p className="home__text">
          SchemeAssist AI is an independent assistance platform created
          for educational and guidance purposes. Final eligibility,
          approval, and application decisions always rest with the
          respective government authorities.
        </p>
      </section>

    </main>
  );
}

export default Home;
