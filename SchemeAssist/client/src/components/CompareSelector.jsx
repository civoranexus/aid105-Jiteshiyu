import { useState } from "react";
import Button from "../components/ui/Button";
import Page from "../components/Page";

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
    <Page>
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

      <Button
        disabled={selected.length < 2}
        onClick={() => onCompare(selected)}
      >
        Compare Selected
      </Button>
    </div>
    </Page>
  );
};

export default CompareSelector;
