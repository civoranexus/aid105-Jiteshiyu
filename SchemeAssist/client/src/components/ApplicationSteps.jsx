import "./ApplicationSteps.css";

const ApplicationSteps = ({ data }) => {
  return (
    <div className="application-section">
      <h4>How to Apply</h4>

      <p><strong>Mode:</strong> {data.applicationMode}</p>

      <ol>
        {data.steps.map((step) => (
          <li key={step.stepNumber}>{step.description}</li>
        ))}
      </ol>

      <h4>Required Documents</h4>
      <ul>
        {data.requiredDocuments.map((doc, i) => (
          <li key={i}>{doc}</li>
        ))}
      </ul>

      <p>
        <strong>Follow-up:</strong> {data.followUpProcess}
      </p>

      <a href={data.officialPortal} target="_blank" rel="noreferrer">
        Go to Official Portal
      </a>
    </div>
  );
};

export default ApplicationSteps;
