import { useEffect, useState } from "react";
import {
  fetchWatchlistApi,
  removeFromWatchlistApi,
} from "../services/watchlistApi";
import "./Watchlist.css";
import Button from "../components/ui/Button";
import Page from "../components/Page";

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
    <Page>
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

          <Button
            className="watchlist-remove"
            onClick={() => removeScheme(s._id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
    </Page>
  );
};

export default Watchlist;
