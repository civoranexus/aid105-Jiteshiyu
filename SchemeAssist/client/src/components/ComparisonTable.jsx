import "./ComparisonTable.css";

const Row = ({ label, values }) => (
  <tr>
    <td className="cmp-label">{label}</td>
    {values.map((v, i) => (
      <td key={i}>{v || "—"}</td>
    ))}
  </tr>
);

const ComparisonTable = ({ schemes }) => {
  if (!schemes?.length) return null;

  return (
    <table className="cmp-table">
      <thead>
        <tr>
          <th>Field</th>
          {schemes.map((s) => (
            <th key={s.id}>{s.name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <Row label="Min Age" values={schemes.map(s => s.minAge)} />
        <Row label="Max Age" values={schemes.map(s => s.maxAge)} />
        <Row label="Min Income" values={schemes.map(s => s.minIncome)} />
        <Row label="Max Income" values={schemes.map(s => s.maxIncome)} />
        <Row label="Category" values={schemes.map(s => s.category)} />
        <Row label="Education" values={schemes.map(s => s.education)} />
        <Row label="Apply Mode" values={schemes.map(s => s.applicationMode)} />
        <Row
          label="Documents"
          values={schemes.map(s => s.documents.join(", "))}
        />
      </tbody>
    </table>
  );
};

export default ComparisonTable;
