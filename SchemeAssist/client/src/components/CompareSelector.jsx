import { useState } from "react";

const CompareSelector = ({ schemes, onCompare }) => {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  return (
    <div>
      <h4>Select up to 3 schemes</h4>

      {schemes.map((s) => (
        <label key={s._id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selected.includes(s._id)}
            onChange={() => toggle(s._id)}
          />
          {s.name}
        </label>
      ))}

      <button
        disabled={selected.length < 2}
        onClick={() => onCompare(selected)}
      >
        Compare Selected
      </button>
    </div>
  );
};

export default CompareSelector;
