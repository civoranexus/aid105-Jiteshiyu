import { useEffect, useState } from "react";
import CompareSelector from "../components/CompareSelector";
import ComparisonTable from "../components/ComparisonTable";
import { compareSchemesApi } from "../services/comparisonApi";
import { fetchSchemes } from "../services/schemeApi";
import Page from "../components/Page";

const ComparePage = () => {
  const [schemes, setSchemes] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes()
      .then((res) => setSchemes(res.data))
      .catch(() => setSchemes([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCompare = async (ids) => {
    const res = await compareSchemesApi(ids);
    setResult(res.data.schemes);
  };

  if (loading) return <p>Loading schemes...</p>;

  return (
    <Page>
    <div>
      <h2>Scheme Comparison</h2>

      <CompareSelector schemes={schemes} onCompare={handleCompare} />

      <ComparisonTable schemes={result} />
    </div>
    </Page>
  );
};

export default ComparePage;
