import { useEffect, useState } from "react";
import {
  fetchWatchlistApi,
  removeFromWatchlistApi,
} from "../services/watchlistApi";
import "./Watchlist.css";

const Watchlist = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchWatchlistApi().then((res) => setSchemes(res.data));
  }, []);

  const removeScheme = async (id) => {
    await removeFromWatchlistApi(id);
    setSchemes((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>

      {schemes.length === 0 && (
        <p className="watchlist-empty">
          No schemes saved yet.
        </p>
      )}

      {schemes.map((s) => (
        <div key={s._id} className="watchlist-item">
          <h4>{s.name}</h4>

          <button
            className="watchlist-remove"
            onClick={() => removeScheme(s._id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
