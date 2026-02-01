import { useEffect, useState } from "react";
import { fetchSchemes } from "../services/api";
import { addToWatchlistApi } from "../services/watchlistApi";
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

  const handleSave = async (schemeId) => {
    try {
      await addToWatchlistApi(schemeId);
      alert("Added to watchlist");
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to add to watchlist"
      );
    }
  };

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

              {scheme.ministry && (
                <p>
                  <strong>Ministry:</strong> {scheme.ministry}
                </p>
              )}

              {scheme.description && (
                <p>{scheme.description}</p>
              )}

              {scheme.benefits && (
                <p>
                  <strong>Benefits:</strong> {scheme.benefits}
                </p>
              )}

              <div className="scheme-card__meta">
                {scheme.category && (
                  <span className="scheme-tag">
                    Category: {scheme.category}
                  </span>
                )}

                {scheme.state && (
                  <span className="scheme-tag">
                    State: {scheme.state}
                  </span>
                )}
              </div>

              <button
                className="scheme-card__save"
                onClick={() => handleSave(scheme._id)}
              >
                Save to Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Schemes;
