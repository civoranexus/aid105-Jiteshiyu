import { useEffect, useState } from "react";
import { fetchSchemes } from "../services/api";

function Schemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes()
      .then(data => setSchemes(data))
      .catch(() => setSchemes([]));
  }, []);

  return (
    <section style={{ padding: "2rem" }}>
      <h1>Available Schemes</h1>

      {schemes.length === 0 ? (
        <p>No schemes available yet.</p>
      ) : (
        <ul>
          {schemes.map(scheme => (
            <li key={scheme.id}>{scheme.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Schemes;
