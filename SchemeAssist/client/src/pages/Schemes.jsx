import { useEffect, useState } from "react";
import { fetchSchemes } from "../services/api";
import "./Schemes.css";

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        const data = await fetchSchemes();
        setSchemes(data);
      } catch (err) {
        console.error("Failed to fetch schemes:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSchemes();
  }, []);

  return (
    <main className="schemes">
      <h1>Available Government Schemes</h1>

      {loading && <p>Loading schemes...</p>}

      {error && (
        <p className="schemes__error">
          Unable to load schemes at the moment. Please try again later.
        </p>
      )}

      {!loading && !error && schemes.length === 0 && (
        <p>No schemes are currently available.</p>
      )}

      {!loading && !error && schemes.length > 0 && (
        <div className="schemes__list">
          {schemes.map((scheme) => (
            <div key={scheme._id} className="scheme-card">
              <h2 className="scheme-card__title">{scheme.name}</h2>

              <p className="scheme-card__description">
                {scheme.description}
              </p>

              {scheme.eligibility && (
                <div className="scheme-card__eligibility">
                  <strong>Eligibility:</strong>
                  <ul>
                    {scheme.eligibility.incomeRange && (
                      <li>Income: {scheme.eligibility.incomeRange}</li>
                    )}
                    {scheme.eligibility.ageGroup && (
                      <li>Age: {scheme.eligibility.ageGroup}</li>
                    )}
                    {scheme.eligibility.category && (
                      <li>Category: {scheme.eligibility.category}</li>
                    )}
                    {scheme.eligibility.location && (
                      <li>Location: {scheme.eligibility.location}</li>
                    )}
                  </ul>
                </div>
              )}

              {scheme.benefits && (
                <p className="scheme-card__benefits">
                  <strong>Benefits:</strong> {scheme.benefits}
                </p>
              )}

              {scheme.officialLink && (
                <a
                  href={scheme.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheme-card__link"
                >
                  Official Website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Schemes;
