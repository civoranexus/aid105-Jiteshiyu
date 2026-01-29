import { useEffect, useState } from "react";
import { fetchApplicationProcess } from "../services/applicationApi";
import ApplicationSteps from "../components/ApplicationSteps";
import "./SchemeDetails.css";

const SchemeDetails = ({ schemeId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchApplicationProcess(schemeId)
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, [schemeId]);

  if (!data) return <p>Application details not available.</p>;

  return <ApplicationSteps data={data} />;
};

export default SchemeDetails;
