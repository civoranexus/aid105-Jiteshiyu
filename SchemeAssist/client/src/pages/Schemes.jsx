import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatusBlock from "../components/StatusBlock";

import { fetchSchemes } from "../services/API";
import { addToWatchlistApi } from "../services/watchlistApi";

import "./Schemes.css";

function Schemes() {
  const [schemes, setSchemes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSchemes = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSchemes();
      setSchemes(data);
    } catch (errMsg) {
      setError(errMsg);
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  const handleSave = async (schemeId) => {
    try {
      await addToWatchlistApi(schemeId);

      toast.success("Added to watchlist");
    } catch (errMsg) {
      toast.error(errMsg);
    }
  };

  return (
    <main className="schemes">
      <h1>Available Government Schemes</h1>

      <StatusBlock
        loading={loading}
        error={error}
        onRetry={loadSchemes}
      />

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

              {scheme.description && <p>{scheme.description}</p>}

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
                disabled={loading}
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
